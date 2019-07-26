<?php

namespace App\GraphQL\Type;

use GraphQL\Language\AST\Node;
use Overblog\GraphQLBundle\Annotation as GQL;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use GraphQL\Type\Definition\ScalarType;

/**
 * Class DatetimeType
 *
 * @GQL\Scalar(name="DateTime")
 */
class DateTimeType extends ScalarType implements AliasedInterface
{
    /**
     * @param \DateTimeInterface $value
     *
     * @return string
     */
    public function serialize($value)
    {
        return $value->format('Y-m-d H:i:s');
    }

    /**
     * @param mixed $value
     *
     * @return \DateTimeInterface
     */
    public function parseValue($value)
    {
        return new \DateTimeImmutable($value);
    }

    /**
     * @param Node $valueNode
     *
     * @return \DateTimeInterface
     */
    public function parseLiteral($valueNode, ?array $variables = null)
    {
        return new \DateTimeImmutable($valueNode->value);
    }

    /**
     * {@inheritdoc}
     */
    public static function getAliases(): array
    {
        return ['DateTime', 'Date'];
    }
}
