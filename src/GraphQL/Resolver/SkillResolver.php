<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Doctrine\ORM\EntityManagerInterface;

class SkillResolver implements ResolverInterface, AliasedInterface {

    /** @var EntityManagerInterface $em */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function resolve(Argument $args)
    {
        if ($args['id']) {
            $skill = $this->em->getRepository('App:Skills')->find($args['id']);
            return $skill;
        } else if ($args['title']) {
            $skill = $this->em->getRepository('App:Skills')->findOneBy([
                'title' => $args['title']
            ]);
            return $skill;
        }
    }

    public static function getAliases(): array
    {
        return [
            'resolve' => 'Skill'
        ];
    }
}
