<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Category;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/products')]
class ProductController extends AbstractController
{
    private ProductRepository $repository;
    private EntityManagerInterface $entityManager;

    public function __construct(ProductRepository $repository, EntityManagerInterface $entityManager)
    {
        $this->repository = $repository;
        $this->entityManager = $entityManager;
    }

    // List all products
    #[Route('', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $products = $this->repository->findAll();


        $data = [];
        foreach ($products as $product) {
            $data[] = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'price' => $product->getPrice(),
                'createdAt' => $product->getCreatedAt()->format('Y-m-d H:i:s'),
                'category' => [
                    'id' => $product->getCategory()->getId(),
                    'name' => $product->getCategory()->getName(),
                ],
            ];
        }

        return new JsonResponse($data);
    }

    // Show a single product's details
    #[Route('/{id}', methods: ['GET'])]
    public function show(Product $product): JsonResponse
    {
        // Manually convert the product to an array
        $data = [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'price' => $product->getPrice(),
            'createdAt' => $product->getCreatedAt()->format('Y-m-d H:i:s'),
            'category' => [
                'id' => $product->getCategory()->getId(),
                'name' => $product->getCategory()->getName(),
            ],
        ];

        return new JsonResponse($data);
    }

    // Create a new product
    #[Route('', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['name'], $data['price'], $data['category'])) {
            return new JsonResponse(['error' => 'Name, price, and category are required'], 400);
        }

        $category = $this->entityManager->getRepository(Category::class)->find($data['category']);

        if (!$category) {
            return new JsonResponse(['error' => 'Invalid category'], 400);
        }

        $product = new Product();
        $product->setName($data['name'])
            ->setDescription($data['description'] ?? null)
            ->setPrice($data['price'])
            ->setCategory($category)
            ->setCreatedAt(new \DateTimeImmutable()); // Automatically set created_at

        $this->entityManager->persist($product);
        $this->entityManager->flush();

        return new JsonResponse([
            'id' => $product->getId(),
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'price' => $product->getPrice(),
            'createdAt' => $product->getCreatedAt()->format('Y-m-d H:i:s'),
            'category' => [
                'id' => $product->getCategory()->getId(),
                'name' => $product->getCategory()->getName(),
            ]
        ], 201);
    }

    // Update a product
    #[Route('/{id}', methods: ['PUT'])]
    public function update(Request $request, Product $product): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $product->setName($data['name']);
        }

        if (isset($data['description'])) {
            $product->setDescription($data['description']);
        }

        if (isset($data['price'])) {
            $product->setPrice($data['price']);
        }

        if (isset($data['category'])) {
            $category = $this->entityManager->getRepository(Category::class)->find($data['category']);
            if (!$category) {
                return new JsonResponse(['error' => 'Invalid category'], 400);
            }
            $product->setCategory($category);
        }

        $this->entityManager->flush();

        return new JsonResponse([
            'id' => $product->getId(),
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'price' => $product->getPrice(),
            'createdAt' => $product->getCreatedAt()->format('Y-m-d H:i:s'),
            'category' => [
                'id' => $product->getCategory()->getId(),
                'name' => $product->getCategory()->getName(),
            ]
        ]);
    }

    // Delete a product
    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(Product $product): JsonResponse
    {
        $this->entityManager->remove($product);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Product deleted'], 204);
    }
}
