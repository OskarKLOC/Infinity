<?php

namespace App\Controller;

use App\Entity\Capsule;
use DateTime;
use App\Entity\Content;
use App\Form\ContentType;
use App\Repository\CapsuleRepository;
use App\Repository\ContentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

#[Route('/content')]
class ContentController extends AbstractController
{
    
    #[Route('/', name: 'app_content_index', methods: ['GET'])]
    public function index(ContentRepository $contentRepository): Response
    {
        return $this->render('content/index.html.twig', [
            'contents' => $contentRepository->findAll(),
        ]);
    }

    #[Route('/api_get_all_content/{id}', name: 'app_content_api_get_all', methods: ['GET', 'POST'])]
    public function apiGetAllContents(Request $request, Capsule $capsule, ContentRepository $contentRepository): JsonResponse
    {
        $capsuleId = $request->get('id');
        $contents = $contentRepository->findAllByCapsuleId($capsuleId);
        
        // On prépare ce qui va nous permettre de sérialiser l'objet pour le transmettre
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        // On sérialise l'objet à transmettre, en sélectionnant les valeurs sans relations
        $data = $serializer->serialize($contents, 'json', [AbstractNormalizer::ATTRIBUTES => ['id', 'contentName', 'contentType', 'caption', 'url', 'creationDate', 'editTime', 'contenusStatus']]);

        // On transmet notre objet qui contient les données d'une capsule
        return new JsonResponse($data);
    }


    #[Route('/api_set_content/{id}', name: 'app_content_api_set', methods: ['POST'])]
    public function apiSetContent(Request $request, Capsule $capsule, ContentRepository $contentRepository): JsonResponse
    {        
        // On récupère les données envoyées en POST et FILE
        $newContent = json_decode($request->request->get('content'));
        $newFile = $request->files->get('file');

        // On crée le répertoire qui permet de stocker les fichiers reçus
        $filesystem = new Filesystem();
        $filesystem->mkdir('../public/data/content/' . $newContent->capsuleId);

        // On déclare l'objet qui va contenir les informations à pousser en BDD
        $content = new Content();

        // On initie les valeurs prédéfinies
        $content->setCapsule($capsule);
        $content->setCreationDate(new DateTime());
        $content->setEditTime(new DateTime());
        $content->setContenusStatus('WAITING_FOR_ADD');
        
        // La longueur du titre associé au fichier est-il dans la limite attendue ?
        if (strlen($newContent->name) < 255) {
            $content->setContentName($newContent->name);
        } else {
            return new JsonResponse('Erreur - Le titre associé au fichier est trop long');
        }

        // Le format renvoyé fait-il partie des valeurs admissibles ?
        if($newContent->type == 'photo' || $newContent->type == 'audio'  || $newContent->type == 'vidéo'|| $newContent->type == 'texte') {
            $content->setContentType($newContent->type);
        } else {
            return new JsonResponse('Erreur - Format de contenu non autorisé');
        }

        // On pousse le contenu de la description
        // Pour le moment, je ne vois pas quels contrôles je pourrais faire
        $content->setCaption($newContent->message);

        // Un fichier a-t-il été transmis ?
        if ($newFile && $newContent->type != 'texte') {
            // La taille du fichier est-il dans la limite autorisée ?
            if ($newFile->getSize() <= 3000000)
            {
                $tmpImagePath = $newFile->getPathName();
                $destinationImagePath = '../public/data/content/'. $newContent->capsuleId . '/' . $newFile->getFileName() . '.jpg';
                $content->setURL($destinationImagePath);
                $succes = move_uploaded_file($tmpImagePath, $destinationImagePath);
            } else {
                return new JsonResponse('Erreur - La taille du fichier est trop importante');
            }
        }

        // Le contenu est-il de type texte ?
        if ($newContent->type = 'texte') {
            $content->setURL('NONE');
        }
        
        // On met à jour en BDD les contenus associés à la capsule avec les informations reçues
        $contentRepository->add($content, true);

        // On transmet la réponse confirmant que l'enregistrement s'est bien réalisé
        return new JsonResponse('Nouveau contenu ajouté avec succès');
    }


    #[Route('/api_set_selection/{id}', name: 'app_content_api_set_selection', methods: ['POST'])]
    public function apiSetSelection(Request $request, Capsule $capsule, ContentRepository $contentRepository): JsonResponse
    {        
        // On récupère tous les contenus de la capsule
        $capsuleId = $request->get('id');
        $contents = $contentRepository->findAllByCapsuleId($capsuleId);
        
        // On récupère les identifiants de contenus sélectionnés passés en POST
        $selection = json_decode($request->getContent());

        // On boucle sur tous les contenus de la capsule
        foreach ($contents as $content) {
            // On réinitialise l'inclusion dans la capsule finale
            $content->setContenusStatus('WAITING_FOR_ADD');
            // Si le contenu fait partie de la sélection, on met à jour son inclusion
            if (in_array($content->getId(), $selection) != false) {
                $content->setContenusStatus('ADDED');
            }
            // On injecte le contenu ajusté
            $contentRepository->add($content, true);
        }

        // On transmet la réponse confirmant que l'enregistrement s'est bien réalisé
        return new JsonResponse('Sélection prise en compte avec succès');
    }


    #[Route('/new', name: 'app_content_new', methods: ['GET', 'POST'])]
    public function new(Request $request, ContentRepository $contentRepository): Response
    {
        $content = new Content();
        $form = $this->createForm(ContentType::class, $content);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $contentRepository->add($content, true);

            return $this->redirectToRoute('app_content_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('content/new.html.twig', [
            'content' => $content,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_content_show', methods: ['GET'])]
    public function show(Content $content): Response
    {
        return $this->render('content/show.html.twig', [
            'content' => $content,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_content_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Content $content, ContentRepository $contentRepository): Response
    {
        $form = $this->createForm(ContentType::class, $content);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $contentRepository->add($content, true);

            return $this->redirectToRoute('app_content_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('content/edit.html.twig', [
            'content' => $content,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_content_delete', methods: ['POST'])]
    public function delete(Request $request, Content $content, ContentRepository $contentRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$content->getId(), $request->request->get('_token'))) {
            $contentRepository->remove($content, true);
        }

        return $this->redirectToRoute('app_content_index', [], Response::HTTP_SEE_OTHER);
    }
}
