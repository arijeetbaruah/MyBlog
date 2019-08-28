<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    /**
     * @Route("/{page}/{id}", name="app", requirements={"page" = "home|skill|project|experience|education|certificate"}, defaults={"page" = "home", "id" = null})
     */
    public function index($page)
    {
        $title = "";
        switch ($page) {
            case 'skill':
                $title = "Skills | Arijeet Baruah's Portfolio";
                break;
            case 'project':
                $title = "Projects | Arijeet Baruah's Portfolio";
                break;
            case 'experience':
                $title = "Experience | Arijeet Baruah's Portfolio";
                break;
            default:
                $title = "Arijeet Baruah's Portfolio";
                break;
        }

        return $this->render('app/index.html.twig', [
            "title" => $title,
        ]);
    }
}
