<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Doctrine\ORM\EntityManagerInterface;

class UsersResolver implements ResolverInterface, AliasedInterface {

    /** @var EntityManagerInterface $em */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function resolve(Argument $args)
    {
        $users = $this->em->getRepository('App:User')->findAll();
        return $users;
    }

    public static function getAliases(): array
    {
        return [
            'resolve' => 'Users'
        ];
    }
}
