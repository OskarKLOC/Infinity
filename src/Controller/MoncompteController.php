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
        
        // On prépare la variable qui nous servira de réponse
        $response = new stdClass();
        
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

            // On prépare la donnée à renvoyer
            $response->succes = true;
            $response->recipients = $data;
        } else {
            $response->succes = false;
            $response->message = 'Impossible de récupérer les capsules - Utilisateur non connecté';
        }
        return new JsonResponse($response);
    }

    #[Route('/api_get_selected_recipients/{id}', name: 'app_moncompte_recipient_get_selected', methods: ['GET', 'POST'])]
    public function findSelectedRecipients(Request $request, Capsule $capsule, CapsuleRepository $capsuleRepository, CapsuleUserRepository $capsuleUserRepository): JsonResponse
    {
        
        // On prépare la variable qui nous servira de réponse
        $response = new stdClass();
        
        // L'utilisateur est-il connecté ?
        if ($this->getUser()) {
            $recipientsSelection = $capsuleUserRepository->findAllRecipients($capsule->getId());
            $data = [];
            foreach ($recipientsSelection as $recipientSelected) {
                array_push($data, $recipientSelected->getUser()->getId());
            }

            // On prépare la donnée à renvoyer
            $response->succes = true;
            $response->selection = $data;
        } else {
            $response->succes = false;
            $response->message = 'Impossible de récupérer la sélection - Utilisateur non connecté';
        }
        return new JsonResponse($response);
    }

    #[Route('/api_new_recipient', name: 'app_moncompte_recipient_new', methods: ['GET', 'POST'])]
    public function newRecipient(Request $request, UserRepository $userRepository): JsonResponse
    {
        // On déclare l'objet qui contiendra la réponse de notre API
        $response = new stdClass();

        // On récupère les informations passées en POST
        $newUser = json_decode($request->getContent());
        // dd($newUser);
        
        // L'utilisateur est-il connecté ?
        if ($this->getUser()) {
            // On déclare les objets que nous allons alimenter
            $recipient = new User();

            // On renseigne les informations spécifiques à la création d'un nouveau destinataire
            $recipient->setRoles(['ROLE_USER']);
            $recipient->setPassword(' ');

            // On récupère l'utilisateur actif
            $owner = $this->getUser();
            $recipient->addOwner($owner);

            // Un email a-t-il été renseigné ?
            if (isset($newUser->email)) {
                // Si oui, le format du mail est-il valide ?
                if (preg_match('^[A-Za-z0-9._-]+@[A-Za-z0-9._-]+\\.[a-z][a-z]+$^', $newUser->email)) {
                    $recipient->setEmail($newUser->email);
                // Sinon, on arrête le processus pour format d'email invalide
                } else {
                    $response->success = false;
                    $response->message = 'Impossible de créer le destinataire - Le format du mail est invalide';
                    return new JsonResponse($response);
                }
            // Sinon, on arrête le processus pour absence d'email
            } else {
                $response->success = false;
                $response->message = 'Impossible de créer le destinataire - Aucun email renseigné';
                return new JsonResponse($response);
            }

            // Un nom de famille a-t-il été renseigné ?
            if (isset($newUser->lastname)) {
                // La longueur du nom du destinataire est-elle dans la limite attendue ?
                if (strlen($newUser->lastname) < 255) {
                    $recipient->setLastname($newUser->lastname);
                // Sinon, on arrête le processus pour format de nom invalide
                } else {
                    $response->success = false;
                    $response->message = 'Impossible de créer le destinataire - Le nom de famille est trop long';
                    return new JsonResponse($response);
                }
            }

            // Un prénom a-t-il été renseigné ?
            if (isset($newUser->firstname)) {
                // La longueur du prénom du destinataire est-elle dans la limite attendue ?
                if (strlen($newUser->firstname) < 255) {
                    $recipient->setFirstname($newUser->firstname);
                // Sinon, on arrête le processus pour format de prénom invalide
                } else {
                    $response->success = false;
                    $response->message = 'Impossible de créer le destinataire - Le prénom est trop long';
                    return new JsonResponse($response);
                }
            }
            
            // Un numéro de téléphone a-t-il été renseigné ?
            if (isset($newUser->phone)) {
                $phone = str_replace(' ', '', $newUser->phone);
                $phone = str_replace('.', '', $phone);
                // Le format du numéro de téléphone est-il valide ?
                if (preg_match('^(0|\\+33|0033)[1-9][0-9]{8}^', $phone)) {
                    // La longueur du téléphone est-il dans la limite attendue ?
                    if (strlen($newUser->firstname) <= 10) {
                        $recipient->setPhoneNumber($phone);
                    // Sinon, on arrête le processus pour format de téléphone invalide
                    } else {
                        $response->success = false;
                        $response->message = 'Impossible de créer le destinataire - Le format du numéro de téléphone est trop long';
                        return new JsonResponse($response);
                    }
                // Sinon, on arrête le processus pour format de téléphone invalide
                } else {
                    $response->success = false;
                    $response->message = 'Impossible de créer le destinataire - Le format du numéro de téléphone est invalide';
                    return new JsonResponse($response);
                }
            }
                    
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

    #[Route('/api_get_user/{id}', name: 'app_moncompte_api_get_user', methods: ['GET', 'POST'])]
    public function apiGetUser(Request $request, User $user, UserRepository $userRepository): JsonResponse
    {
        // On prépare ce qui va nous permettre de sérialiser l'objet pour le transmettre
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        // On sérialise l'objet à transmettre, en sélectionnant les valeurs sans relations
        $data = $serializer->serialize($user, 'json', [AbstractNormalizer::ATTRIBUTES => ['id', 'email', 'roles', 'lastname', 'firstname', 'phoneNumber']]);

        // On transmet notre objet qui contient les données d'un utilisateur
        return new JsonResponse($data);
    }

    #[Route('/api_set_user/{id}', name: 'app_moncompte_api_set_user', methods: ['POST'])]
    public function apiSetUser(Request $request, User $user, UserRepository $userRepository): JsonResponse
    {
        // On déclare l'objet qui contiendra la réponse de notre API
        $response = new stdClass();

        /* try {
            //code...
        } catch (\Throwable $th) {
            //throw $th;
        } */

        // On récupère les informations passées en POST
        $newUser = json_decode($request->getContent());
        // dd($newUser);
        
        // L'utilisateur est-il connecté ?
        if ($this->getUser()) {

            // On récupère l'utilisateur actif
            $owner = $this->getUser();
            $user->addOwner($owner);

            // Un email a-t-il été renseigné ?
            if (isset($newUser->email)) {
                // Si oui, le format du mail est-il valide ?
                if (preg_match('^[A-Za-z0-9._-]+@[A-Za-z0-9._-]+\\.[a-z][a-z]+$^', $newUser->email)) {
                    $user->setEmail($newUser->email);
                // Sinon, on arrête le processus pour format d'email invalide
                } else {
                    $response->success = false;
                    $response->message = 'Impossible de modifier le destinataire - Le format du mail est invalide';
                    return new JsonResponse($response);
                }
            // Sinon, on arrête le processus pour absence d'email
            } else {
                $response->success = false;
                $response->message = 'Impossible de modifier le destinataire - Aucun email renseigné';
                return new JsonResponse($response);
            }

            // Un nom de famille a-t-il été renseigné ?
            if (isset($newUser->lastname)) {
                // La longueur du nom du destinataire est-elle dans la limite attendue ?
                if (strlen($newUser->lastname) < 255) {
                    $user->setLastname($newUser->lastname);
                // Sinon, on arrête le processus pour format de nom invalide
                } else {
                    $response->success = false;
                    $response->message = 'Impossible de modifier le destinataire - Le nom de famille est trop long';
                    return new JsonResponse($response);
                }
            }

            // Un prénom a-t-il été renseigné ?
            if (isset($newUser->firstname)) {
                // La longueur du prénom du destinataire est-elle dans la limite attendue ?
                if (strlen($newUser->firstname) < 255) {
                    $user->setFirstname($newUser->firstname);
                // Sinon, on arrête le processus pour format de prénom invalide
                } else {
                    $response->success = false;
                    $response->message = 'Impossible de modifier le destinataire - Le prénom est trop long';
                    return new JsonResponse($response);
                }
            }
            
            // Un numéro de téléphone a-t-il été renseigné ?
            if (isset($newUser->phone)) {
                $phone = str_replace(' ', '', $newUser->phone);
                $phone = str_replace('.', '', $phone);
                // Le format du numéro de téléphone est-il valide ?
                if (preg_match('^(0|\\+33|0033)[1-9][0-9]{8}^', $phone)) {
                    // La longueur du téléphone est-il dans la limite attendue ?
                    if (strlen($newUser->firstname) <= 10) {
                        $user->setPhoneNumber($phone);
                    // Sinon, on arrête le processus pour format de téléphone invalide
                    } else {
                        $response->success = false;
                        $response->message = 'Impossible de modifier le destinataire - Le format du numéro de téléphone est trop long';
                        return new JsonResponse($response);
                    }
                // Sinon, on arrête le processus pour format de téléphone invalide
                } else {
                    $response->success = false;
                    $response->message = 'Impossible de modifier le destinataire - Le format du numéro de téléphone est invalide';
                    return new JsonResponse($response);
                }
            }
                    
            // On injecte en BDD les informations sur la nouvelle capsule créée
            $userRepository->add($user, true);

            // On prépare la réponse de succès de création
            $response->recipientId = $user->getId();
            $response->success = true;
            $response->message = 'Destinataire mis à jour';
        } else {
            // On prépare la réponse d'échec de création
            $response->success = false;
            $response->message = 'Impossible de modifier le destinataire - Utilisateur non connecté';
        }
        
        // On envoie la réponse de l'API
        return new JsonResponse($response);
    }

}
