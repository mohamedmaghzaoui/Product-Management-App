<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/categories')]
class CategoryController extends AbstractController
{
    private CategoryRepository $repository;
    private EntityManagerInterface $entityManager;

    public function __construct(CategoryRepository $repository, EntityManagerInterface $entityManager)
    {
        $this->repository = $repository;
        $this->entityManager = $entityManager;
    }

    // List all categories
    #[Route('', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $categories = $this->repository->findAll();


        $data = [];
        foreach ($categories as $category) {
            $data[] = [
                'id' => $category->getId(),
                'name' => $category->getName(),
            ];
        }

        return new JsonResponse($data);
    }

    // Show a single category's details
    #[Route('/{id}', methods: ['GET'])]
    public function show(Category $category): JsonResponse
    {
        // Manually convert the category to an array
        $data = [
            'id' => $category->getId(),
            'name' => $category->getName(),
        ];

        return new JsonResponse($data);
    }

    // Create a new category
    #[Route('', methods: ['POST'])]
    public function create(Request $request, ValidatorInterface $validator): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['name'])) {
            return new JsonResponse(['error' => 'Name is required'], 400);
        }

        $category = new Category();
        $category->setName($data['name']);
        // Use Validator 
        $errors = $validator->validate($category);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], 400);
        }

        $this->entityManager->persist($category);
        $this->entityManager->flush();

        return new JsonResponse([
            'id' => $category->getId(),
            'name' => $category->getName(),
        ], 201);
    }

    // Update a category
    #[Route('/{id}', methods: ['PUT'])]
    public function update(Request $request, Category $category): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $category->setName($data['name']);
        }

        $this->entityManager->flush();

        return new JsonResponse([
            'id' => $category->getId(),
            'name' => $category->getName(),
        ]);
    }

    // Delete a category
    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(Category $category): JsonResponse
    {
        $this->entityManager->remove($category);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Category deleted'], 204);
    }
}
