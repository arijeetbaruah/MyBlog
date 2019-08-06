<?php

namespace App\Repository;

use App\Entity\Educations;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Educations|null find($id, $lockMode = null, $lockVersion = null)
 * @method Educations|null findOneBy(array $criteria, array $orderBy = null)
 * @method Educations[]    findAll()
 * @method Educations[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EducationsRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Educations::class);
    }

    // /**
    //  * @return Educations[] Returns an array of Educations objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Educations
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
