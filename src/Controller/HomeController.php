<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(): Response
    {
        $user=$this->getUser();
        
        return $this->render('home/index.html.twig', [ 
            'user' => $user,
        ]);
    }

    #[Route('/concept', name: 'app_home_concept')]
    public function concept(): Response
    {
        $user=$this->getUser();
        
        return $this->renderForm('home/concept.html.twig', [
            'user' => $user,
        ]);
    }

    #[Route('/notrehistoire', name: 'app_home_histoire')]
    public function histoire(): Response
    {
        $user=$this->getUser();
        
        return $this->renderForm('home/notrehistoire.html.twig', [
            'user' => $user,
        ]);
    }
}
