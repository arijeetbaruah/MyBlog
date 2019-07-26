<?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Question\Question;
use App\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Doctrine\ORM\EntityManagerInterface;

class CreateuserCommand extends Command
{
    protected static $defaultName = 'app:createuser';
    
    /** @var UserPasswordEncoderInterface $encoder */
    protected $encoder;

    /** @var EntityManagerInterface $entityManager */
    protected $entityManager;
    
    public function __construct(EntityManagerInterface $entityManager, UserPasswordEncoderInterface $encoder)
    {
        parent::__construct();
        $this->encoder = $encoder;
        $this->entityManager = $entityManager;
    }

    protected function configure()
    {
        $this
            ->setDescription('Add a short description for your command')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $io = new SymfonyStyle($input, $output);
        $helper = $this->getHelper('question');

        $question = new Question("Email");
        $email = $helper->ask($input, $output, $question);

        $question = new Question("Password");
        $password = $helper->ask($input, $output, $question);

        $user = new User();

        $user->setEmail($email);
        $user->setPassword($this->encoder->encodePassword($user, $password));
        $user->setRoles(["ROLE_ADMIN"]);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $io->success('User Created!');
    }
}
