<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProjectsRepository")
 */
class Projects
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $body;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $start_date;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $end_date;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Skills", inversedBy="projects")
     */
    private $skills;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ProjectCodeSnippets", mappedBy="project")
     */
    private $code_snippet_id;

    public function __construct()
    {
        $this->skills = new ArrayCollection();
        $this->code_snippet_id = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getBody(): ?string
    {
        return $this->body;
    }

    public function setBody(?string $body): self
    {
        $this->body = $body;

        return $this;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->start_date;
    }

    public function setStartDate(?\DateTimeInterface $start_date): self
    {
        $this->start_date = $start_date;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->end_date;
    }

    public function setEndDate(?\DateTimeInterface $end_date): self
    {
        $this->end_date = $end_date;

        return $this;
    }

    /**
     * @return Collection|skills[]
     */
    public function getSkills(): Collection
    {
        return $this->skills;
    }

    public function addSkill(skills $skill): self
    {
        if (!$this->skills->contains($skill)) {
            $this->skills[] = $skill;
        }

        return $this;
    }

    public function removeSkill(skills $skill): self
    {
        if ($this->skills->contains($skill)) {
            $this->skills->removeElement($skill);
        }

        return $this;
    }

    public function __toString()
    {
        return $this->title;
    }

    /**
     * @return Collection|ProjectCodeSnippets[]
     */
    public function getCodeSnippetId(): Collection
    {
        return $this->code_snippet_id;
    }

    public function addCodeSnippetId(ProjectCodeSnippets $codeSnippetId): self
    {
        if (!$this->code_snippet_id->contains($codeSnippetId)) {
            $this->code_snippet_id[] = $codeSnippetId;
            $codeSnippetId->setProject($this);
        }

        return $this;
    }

    public function removeCodeSnippetId(ProjectCodeSnippets $codeSnippetId): self
    {
        if ($this->code_snippet_id->contains($codeSnippetId)) {
            $this->code_snippet_id->removeElement($codeSnippetId);
            // set the owning side to null (unless already changed)
            if ($codeSnippetId->getProject() === $this) {
                $codeSnippetId->setProject(null);
            }
        }

        return $this;
    }
}
