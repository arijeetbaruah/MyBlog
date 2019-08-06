<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Educations;

class EducationsResolver implements ResolverInterface, AliasedInterface {

    /** @var EntityManagerInterface $em */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function resolve()
    {
        return $this->em->getRepository(Educations::class)->findAll();
    }

    public static function getAliases(): array
    {
        return [
            'resolve' => 'Educations'
        ];
    }
}
