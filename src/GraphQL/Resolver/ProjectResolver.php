<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Doctrine\ORM\EntityManagerInterface;

class ProjectResolver implements ResolverInterface, AliasedInterface {

    /** @var EntityManagerInterface $em */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function resolve(Argument $args)
    {
        if ($args['id']) {
            $project = $this->em->getRepository('App:Projects')->find($args['id']);
            return $project;
        } else if ($args['title']) {
            $project = $this->em->getRepository('App:Projects')->findOneBy([
                'title' => $args['title']
            ]);
            return $project;
        }
    }

    public static function getAliases(): array
    {
        return [
            'resolve' => 'Project'
        ];
    }
}
