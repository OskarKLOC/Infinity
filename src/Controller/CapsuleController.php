<?php

namespace App\Controller;

use App\Entity\Capsule;
use App\Form\CapsuleType;
use App\Repository\CapsuleRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

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

    #[Route('/api/{id}', name: 'app_capsule_api', methods: ['GET', 'POST'])]
    public function api(Request $request, Capsule $capsule, CapsuleRepository $capsuleRepository): JsonResponse
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

        // dd($capsule);
        return $this->json($capsule);
        /* return $this->json([
            'name' => $capsule->getName(),
            'creation_date' => $capsule->getCreationDate(),
            'status' => $capsule->getCapsuleStatus(),
            'seal_date' => $capsule->getSealDate(),
            'type' => $capsule->getFormat()
        ]); */
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
