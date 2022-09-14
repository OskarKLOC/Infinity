<?php

namespace App\Controller;

use App\Entity\Capsule;
use App\Entity\CapsuleUser;
use App\Entity\User;
use App\Form\UserType;
use App\Repository\CapsuleRepository;
use App\Repository\CapsuleUserRepository;
use App\Repository\UserRepository;
use DateTime;
use stdClass;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Serializer;

#[Route('/moncompte')]
class MoncompteController extends AbstractController
{
    // C'est ici que doit prendre place le lien entre la connection de l'user et cette page, sa page perso. 
    
    // public function index(): Response
    // {
    //     return $this->render('moncompte/index.html.twig', [
    //         'userData' => $this->getUser(),
    //     ]);
    // }

    // // Fromulaire de modification d'un user 
    // $form = $this->createForm(UserType::class, $user);
    // $form->handleRequest($request);

    // if ($form->isSubmitted() && $form->isValid()) {
    //     $userRepository->add($user, true);

    //     return $this->redirectToRoute('app_user_index', [], Response::HTTP_SEE_OTHER);
    // }

    // return $this->renderForm('user/edit.html.twig', [
    //     'user' => $user,
    //     'form' => $form,
    // ]);



    #[Route('/', name: 'app_moncompte')]
    public function edit(Request $request, UserRepository $userRepository): Response
    {
        $user=$this->getUser();
        // Fromulaire de modification d'un user 
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $userRepository->add($user, true);

            return $this->redirectToRoute('app_user_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('moncompte/index.html.twig', [
            'user' => $user,
            'form' => $form,
        ]);
    }

    #[Route('/api_get_all_capsules', name: 'app_moncompte_capsule_get_all', methods: ['GET', 'POST'])]
    public function findAllCapsules(Request $request, CapsuleRepository $capsuleRepository, CapsuleUserRepository $capsuleUserRepository): JsonResponse
    {
        // L'utilisateur est-il connecté ?
        if ($this->getUser()) {
            // On récupère toutes les capsules liées à l'utilisateur connecté
            $capsules = $capsuleUserRepository->findAllByOwnerId($this->getUser());

            // On prépare ce qui va nous permettre de sérialiser l'objet pour le transmettre, et on le sérialise
            $encoders = [new XmlEncoder(), new JsonEncoder()];
            $normalizers = [new ObjectNormalizer()];
            $serializer = new Serializer($normalizers, $encoders);
            $data = $serializer->serialize($capsules, 'json', [AbstractNormalizer::ATTRIBUTES => ['id', 'name']]);

            // On envoie la réponse de l'API
            return new JsonResponse($data);
        } else {
            return new JsonResponse('Impossible de récupérer les capsules - Utilisateur non connecté');
        }
    }


    #[Route('/api_new_capsule', name: 'app_moncompte_capsule_new', methods: ['GET', 'POST'])]
    public function newCapsule(Request $request, CapsuleRepository $capsuleRepository, CapsuleUserRepository $capsuleUserRepository): JsonResponse
    {
        // On déclare l'objet qui contiendra la réponse de notre API
        $response = new stdClass();
        
        // L'utilisateur est-il connecté ?
        if ($this->getUser()) {
            // On déclare les objets que nous allons alimenter
            $capsule = new Capsule();
            $capsuleUser = new CapsuleUser();

            // On renseigne les informations spécifiques à la création de la capsule
            $capsule->setCreationDate(new DateTime());
            $capsule->setCapsuleStatus('UNSEALED');

            // On récupère l'utilisateur actif
            $user = $this->getUser();

            // On renseigne les informations de relation entre l'utilisateur et la capsule
            $capsuleUser->setCapsule($capsule);
            $capsuleUser->setUser($user);
            $capsuleUser->setIsOwner(true);
        
            // On injecte en BDD les informations sur la nouvelle capsule créée
            $capsuleRepository->add($capsule, true);
            $capsuleUserRepository->add($capsuleUser, true);

            // On prépare la réponse de succès de création
            $response->capsuleId = $capsule->getId();
            $response->success = true;
            $response->message = 'Nouvelle capsule créée';
        } else {
            // On prépare la réponse d'échec de création
            $response->success = false;
            $response->message = 'Impossible de créer la capsule - Utilisateur non connecté';
        }
        
        // On envoie la réponse de l'API
        return new JsonResponse($response);
    }

    #[Route('/api_get_all_recipients', name: 'app_moncompte_recipient_get_all', methods: ['GET', 'POST'])]
    public function findAllRecipients(Request $request, CapsuleRepository $capsuleRepository, CapsuleUserRepository $capsuleUserRepository): JsonResponse
    {
        // L'utilisateur est-il connecté ?
        if ($this->getUser()) {

            // On récupère tous les destinataires liés à l'utilisateur connecté
            $user = $this->getUser();
            $recipients = $user->getRecipients();

            // On prépare ce qui va nous permettre de sérialiser l'objet pour le transmettre, et on le sérialise
            $encoders = [new XmlEncoder(), new JsonEncoder()];
            $normalizers = [new ObjectNormalizer()];
            $serializer = new Serializer($normalizers, $encoders);
            $data = $serializer->serialize($recipients, 'json', [AbstractNormalizer::ATTRIBUTES => ['id', 'email', 'roles', 'lastname', 'firstname', 'phoneNumber']]);

            // On envoie la réponse de l'API
            return new JsonResponse($data);
        } else {
            return new JsonResponse('Impossible de récupérer les capsules - Utilisateur non connecté');
        }
    }

    #[Route('/api_new_recipient', name: 'app_moncompte_recipient_new', methods: ['GET', 'POST'])]
    public function newRecipient(Request $request, UserRepository $userRepository): JsonResponse
    {
        // On déclare l'objet qui contiendra la réponse de notre API
        $response = new stdClass();
        
        // L'utilisateur est-il connecté ?
        if ($this->getUser()) {
            // On déclare les objets que nous allons alimenter
            $recipient = new User();

            // On renseigne les informations spécifiques à la création de la capsule
            $recipient->setRoles(['ROLE_USER']);
            $recipient->setEmail(' ');
            $recipient->setPassword(' ');

            // On récupère l'utilisateur actif
            $owner = $this->getUser();
            $recipient->addOwner($owner);
        
            // On injecte en BDD les informations sur la nouvelle capsule créée
            $userRepository->add($recipient, true);

            // On prépare la réponse de succès de création
            $response->recipientId = $recipient->getId();
            $response->success = true;
            $response->message = 'Nouveau destinataire créée';
        } else {
            // On prépare la réponse d'échec de création
            $response->success = false;
            $response->message = 'Impossible de créer le destinataire - Utilisateur non connecté';
        }
        
        // On envoie la réponse de l'API
        return new JsonResponse($response);
    }
}
