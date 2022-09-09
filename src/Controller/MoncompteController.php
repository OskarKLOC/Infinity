<?php

namespace App\Controller;

use App\Form\UserType;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

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



    #[Route('/moncompte', name: 'app_moncompte')]
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
}
