<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Doctrine\ORM\EntityManagerInterface;

class UserResolver implements ResolverInterface, AliasedInterface {

    /** @var EntityManagerInterface $em */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function resolve(Argument $args)
    {
        $user = $this->em->getRepository('App:User')->find($args['id']);
        return $user;
    }

    public static function getAliases(): array
    {
        return [
            'resolve' => 'User'
        ];
    }
}
