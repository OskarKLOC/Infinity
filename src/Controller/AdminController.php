<?php

namespace App\Controller;

use DateTime;
use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Contracts\HttpClient\HttpClientInterface;


#[Route('/admin')]
class AdminController extends AbstractController
{
    
    // Affichage de la page principale de l'admin permettant de lister tous les utilisateurs et la suspiscion de décès
    #[Route('/', name: 'app_admin')]
    public function index(UserRepository $userRepository, HttpClientInterface $client): Response
    {
        
        // L'utilisateur est-il connecté ?
        if ($this->getUser()) {
            // On récupère l'utilisateur connecté
            $admin = $this->getUser();

            if ($admin) {
                // On récupère la liste des utilisateurs inscrits et vivants (avec une date de naissance et aucune date de décès)
                $livingUsers = $userRepository->findAllLivingUsers();

                // On vérifie si le serveur répond
                $response = $client->request(
                    'GET',
                    'https://deces.matchid.io/deces/api/v1/healthcheck'
                );

                // L'API est-elle fonctionnelle ?
                if ($response->toArray()['msg'] == 'OK') {
                    $index = 0;
                    // Si oui, on l'interroge pour chacun de nos utilisateurs vivants
                    foreach ($livingUsers as $livingUser) {
                        $request = 'https://deces.matchid.io/deces/api/v1/search?firstName=' . $livingUser['firstname'] . '&lastName=' . $livingUser['lastname'] . '&fuzzy=false';
                        $response = $client->request(
                            'GET',
                            $request
                        );
                        $livingUsers[$index]['result'] = $response->toArray()['response'];
                        $index++;
                    }
                }

                // On affiche la page en passant en paramètres la liste des utilisateurs vivants
                return $this->renderForm('admin/index.html.twig', [
                    'livingUsers' => $livingUsers
                ]);
            } else {
                return $this->redirectToRoute('app_login');
            }

        // Sinon on redirige vers la page d'accueil du site
        } else {
            return $this->redirectToRoute('app_login');
        }
    }

    // Affichage du détail pour un utilisateur pour lequel il y a un soupçon de décès
    #[Route('/detail/{id}', name: 'app_admin_detail_user', methods: ['GET'])]
    public function detail(User $user, UserRepository $userRepository, HttpClientInterface $client): Response
    {
        
        // L'utilisateur est-il connecté ?
        if ($this->getUser()) {
            // On récupère l'utilisateur connecté
            $admin = $this->getUser();

            if ($admin) {
                // On vérifie si le serveur répond
                $response = $client->request(
                    'GET',
                    'https://deces.matchid.io/deces/api/v1/healthcheck'
                );

                // L'API est-elle fonctionnelle ?
                if ($response->toArray()['msg'] == 'OK') {
                    // Si oui, on l'interroge pour l'utilisateur peut-être décédé
                    $request = 'https://deces.matchid.io/deces/api/v1/search?firstName=' . $user->getFirstname() . '&lastName=' . $user->getLastname() . '&fuzzy=false';
                    $response = $client->request(
                        'GET',
                        $request
                    );
                    $result = $response->toArray()['response'];
                }
                //dd($result);
                // On affiche la page en passant en paramètres la liste des utilisateurs vivants
                return $this->renderForm('admin/detail.html.twig', [
                    'user' => $user,
                    'result' => $result
                ]);
            } else {
                return $this->redirectToRoute('app_login');
            }

        // Sinon on redirige vers la page d'accueil du site
        } else {
            return $this->redirectToRoute('app_login');
        }
    
    }


}
