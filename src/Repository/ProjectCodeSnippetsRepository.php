<?php

namespace App\Repository;

use App\Entity\ProjectCodeSnippets;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ProjectCodeSnippets|null find($id, $lockMode = null, $lockVersion = null)
 * @method ProjectCodeSnippets|null findOneBy(array $criteria, array $orderBy = null)
 * @method ProjectCodeSnippets[]    findAll()
 * @method ProjectCodeSnippets[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProjectCodeSnippetsRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ProjectCodeSnippets::class);
    }

    // /**
    //  * @return ProjectCodeSnippets[] Returns an array of ProjectCodeSnippets objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ProjectCodeSnippets
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
