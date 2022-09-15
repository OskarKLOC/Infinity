<?php

namespace App\Controller;


use App\Entity\CapsuleUser;
use App\Entity\Capsule;
use App\Entity\User;
use App\Form\CapsuleType;
use App\Repository\CapsuleRepository;
use App\Repository\CapsuleUserRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

#[Route('/capsule')]
class CapsuleController extends AbstractController
{
    
    #[Route('/{id}', name: 'app_capsule_index', methods: ['GET', 'POST'])]
    public function index(Request $request, Capsule $capsule, CapsuleRepository $capsuleRepository): Response
    {
        // On récupère le statut de la capsule présent en BDD
        $oldStatus = $capsuleRepository->findOneById($request->get('id'))->getCapsuleStatus();

        $form = $this->createForm(CapsuleType::class, $capsule);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $newStatus = $capsule->getCapsuleStatus();
            if ($newStatus == 'SEALED' && $newStatus != $oldStatus) {
                $capsule->setSealDate(new DateTime());
            }

            $capsuleRepository->add($capsule, true);

            return $this->redirectToRoute('app_capsule_index', ['id' => $capsule->getId()], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('capsule/index.html.twig', [
            'capsule' => $capsule,
            'form' => $form,
        ]);
    }

    #[Route('/api_get_capsule/{id}', name: 'app_capsule_api_get', methods: ['GET', 'POST'])]
    public function apiGetCapsule(Request $request, Capsule $capsule, CapsuleRepository $capsuleRepository): JsonResponse
    {
        // On prépare ce qui va nous permettre de sérialiser l'objet pour le transmettre
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        // On sérialise l'objet à transmettre, en sélectionnant les valeurs sans relations
        $data = $serializer->serialize($capsule, 'json', [AbstractNormalizer::ATTRIBUTES => ['id', 'name', 'capsuleStatus', 'mailingDate', 'format', 'creationDate', 'sealDate']]);

        // On transmet notre objet qui contient les données d'une capsule
        return new JsonResponse($data);
    }

    #[Route('/api_set_capsule/{id}', name: 'app_capsule_api_set', methods: ['POST'])]
    public function apiSetCapsule(Request $request, Capsule $capsule, CapsuleRepository $capsuleRepository, CapsuleUserRepository $capsuleUserRepository): JsonResponse
    {
        // On récupère le contenu passé en POST
        $newCapsule = json_decode($request->getContent());
        // dd($newCapsule);

        // On récupère tous les destinataires liés à l'utilisateur connecté
        $user = $this->getUser();
        $recipients = $user->getRecipients();

        // On récupère le statut de la capsule présente en BDD pour comparer ultérieurement dans la fonction
        $oldStatus = $capsuleRepository->findOneById($request->get('id'))->getCapsuleStatus();
        $newStatus = $newCapsule->capsuleStatus;
        
        // Le statut renvoyé fait-il partie des valeurs admissibles ?
        if($newStatus == 'SEALED' || $newStatus == 'UNSEALED') {
            $capsule->setCapsuleStatus($newStatus);
        } else {
            return new JsonResponse('Erreur - Statut de capsule corrompu');
        }

        // La capsule est-elle de nouveau scellée ?
        if ($newStatus == 'SEALED' && $newStatus != $oldStatus) {
            $capsule->setSealDate(new DateTime());
        }

        // Le format renvoyé fait-il partie des valeurs admissibles ?
        if($newCapsule->format == 'VIRTUAL' || $newCapsule->format == 'SOLID') {
            $capsule->setFormat($newCapsule->format);
        } else {
            return new JsonResponse('Erreur - Format de capsule corrompu');
        }

        // La longueur du nom de la capsule est-il dans la limite attendue ?
        if (strlen($newCapsule->name) < 255) {
            $capsule->setName($newCapsule->name);
        } else {
            return new JsonResponse('Erreur - Le nom de la capsule est trop long');
        }
        
        // On met à jour les données de la capsule avec les informations reçues
        $capsuleRepository->add($capsule, true);

        // On supprime les anciens destinataires présents en BDD
        $oldrecipients = $capsuleUserRepository->findAllRecipients($capsule->getId());
        foreach ($oldrecipients as $oldrecipient) {
            $capsuleUserRepository->remove($oldrecipient, true);
        }

        // On rajoute la nouvelle sélection de destinataires en BDD
        foreach ($recipients as $recipient) {
            // Le destinataire fait-il partie de la sélection ?
            if (in_array($recipient->getId(), $newCapsule->recipientsSelection) != false) {
                // Si oui, on récupère les données nécessaires
                $capsuleUser = new CapsuleUser();
                $capsuleUser->setCapsule($capsule);
                $capsuleUser->setIsOwner(false);
                $capsuleUser->setUser($recipient);
                // Et on les injecte en BDD
                $capsuleUserRepository->add($capsuleUser, true);
            }
        }

        // On transmet la réponse confirmant que l'enregistrement s'est bien réalisé
        return new JsonResponse('Modifications de la capsule enregistrées');

    }

    #[Route('/list', name: 'app_capsule_list', methods: ['GET'])]
    public function list(CapsuleRepository $capsuleRepository): Response
    {
        return $this->render('capsule/list.html.twig', [
            'capsules' => $capsuleRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_capsule_new', methods: ['GET', 'POST'])]
    public function new(Request $request, CapsuleRepository $capsuleRepository): Response
    {
        $capsule = new Capsule();
        $form = $this->createForm(CapsuleType::class, $capsule);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $capsuleRepository->add($capsule, true);

            return $this->redirectToRoute('app_capsule_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('capsule/new.html.twig', [
            'capsule' => $capsule,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_capsule_show', methods: ['GET'])]
    public function show(Capsule $capsule): Response
    {
        return $this->render('capsule/show.html.twig', [
            'capsule' => $capsule,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_capsule_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Capsule $capsule, CapsuleRepository $capsuleRepository): Response
    {
        $form = $this->createForm(CapsuleType::class, $capsule);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $capsuleRepository->add($capsule, true);

            return $this->redirectToRoute('app_capsule_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('capsule/edit.html.twig', [
            'capsule' => $capsule,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_capsule_delete', methods: ['POST'])]
    public function delete(Request $request, Capsule $capsule, CapsuleRepository $capsuleRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$capsule->getId(), $request->request->get('_token'))) {
            $capsuleRepository->remove($capsule, true);
        }

        return $this->redirectToRoute('app_capsule_index', [], Response::HTTP_SEE_OTHER);
    }
}
