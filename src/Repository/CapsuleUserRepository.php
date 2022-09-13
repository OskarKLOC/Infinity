<?php

namespace App\Repository;

use App\Entity\CapsuleUser;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CapsuleUser>
 *
 * @method CapsuleUser|null find($id, $lockMode = null, $lockVersion = null)
 * @method CapsuleUser|null findOneBy(array $criteria, array $orderBy = null)
 * @method CapsuleUser[]    findAll()
 * @method CapsuleUser[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CapsuleUserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CapsuleUser::class);
    }

    public function add(CapsuleUser $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(CapsuleUser $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return CapsuleUser[] Returns an array of CapsuleUser objects
     */
    public function findAllByOwnerId($ownerId): array
    {
        return $this->createQueryBuilder('c')
            ->where('c.user = :owner_id')
            ->andWhere('c.isOwner = true')
            ->setParameter('owner_id', $ownerId)
            ->orderBy('c.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }

//    /**
//     * @return CapsuleUser[] Returns an array of CapsuleUser objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?CapsuleUser
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
