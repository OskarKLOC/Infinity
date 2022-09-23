<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/home', name: 'app_home')]
    public function index(): Response
    {
        $user=$this->getUser();
        
        return $this->render('home/index.html.twig', [ 
            'user' => $user,
        ]);
    }

    //Route vers la page concept 
    #[Route('/concept', name: 'app_moncompte_concept')]
    public function concept(): Response
    {
        $user=$this->getUser();
        
        return $this->renderForm('home/concept.html.twig', [
            'user' => $user,
        ]);
    }
    
    //Route vers la page CGU CGV 
    #[Route('/home/cgv', name: 'app_moncompte_cgv')]
    public function cgvcgu(): Response
     {
         $user=$this->getUser();
        
         return $this->render('home/cgv-cgu.html.twig', [
             'user' => $user,
         ]);
     }


     //Route vers la page engagement 
     #[Route('/home/engagement', name: 'app_moncompte_engagement')]
     public function engagement(): Response
     {
         $user=$this->getUser();
        
         return $this->render('home/contrat-engagement.html.twig', [
             'user' => $user,
         ]);
     }
}
