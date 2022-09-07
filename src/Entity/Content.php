<?php

namespace App\Entity;

use App\Repository\ContentRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ContentRepository::class)]
class Content
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $content_name = null;

    #[ORM\Column(length: 255)]
    private ?string $content_type = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $caption = null;

    #[ORM\Column(length: 255)]
    private ?string $URL = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $creation_date = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $edit_time = null;

    #[ORM\Column(length: 255)]
    private ?string $contenus_status = null;

    #[ORM\ManyToOne(inversedBy: 'contents')]
    private ?Capsule $capsule = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContentName(): ?string
    {
        return $this->content_name;
    }

    public function setContentName(string $content_name): self
    {
        $this->content_name = $content_name;

        return $this;
    }

    public function getContentType(): ?string
    {
        return $this->content_type;
    }

    public function setContentType(string $content_type): self
    {
        $this->content_type = $content_type;

        return $this;
    }

    public function getCaption(): ?string
    {
        return $this->caption;
    }

    public function setCaption(string $caption): self
    {
        $this->caption = $caption;

        return $this;
    }

    public function getURL(): ?string
    {
        return $this->URL;
    }

    public function setURL(string $URL): self
    {
        $this->URL = $URL;

        return $this;
    }

    public function getCreationDate(): ?\DateTimeInterface
    {
        return $this->creation_date;
    }

    public function setCreationDate(\DateTimeInterface $creation_date): self
    {
        $this->creation_date = $creation_date;

        return $this;
    }

    public function getEditTime(): ?\DateTimeInterface
    {
        return $this->edit_time;
    }

    public function setEditTime(\DateTimeInterface $edit_time): self
    {
        $this->edit_time = $edit_time;

        return $this;
    }

    public function getContenusStatus(): ?string
    {
        return $this->contenus_status;
    }

    public function setContenusStatus(string $contenus_status): self
    {
        $this->contenus_status = $contenus_status;

        return $this;
    }

    public function getCapsule(): ?Capsule
    {
        return $this->capsule;
    }

    public function setCapsule(?Capsule $capsule): self
    {
        $this->capsule = $capsule;

        return $this;
    }
}
