<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MoncompteController extends AbstractController
{
    // C'est ici que doit prendre place le lien entre la connection de l'user et cette page, sa page perso. 
    #[Route('/moncompte', name: 'app_moncompte')]
    public function index(): Response
    {
        return $this->render('moncompte/index.html.twig', [
            'userData' => $this->getUser(),
        ]);
    }
}
