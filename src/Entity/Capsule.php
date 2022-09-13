<?php

namespace App\Entity;

use App\Repository\CapsuleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CapsuleRepository::class)]
class Capsule
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable:true)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'capsule', targetEntity: Content::class)]
    private Collection $contents;

    #[ORM\Column(length: 255, nullable:true)]
    private ?string $capsule_status = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable:true)]
    private ?\DateTimeInterface $mailing_date = null;

    #[ORM\Column(length: 255, nullable:true)]
    private ?string $format = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable:true)]
    private ?\DateTimeInterface $creation_date = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable:true)]
    private ?\DateTimeInterface $seal_date = null;

    public function __construct()
    {
        $this->owner = new ArrayCollection();
        $this->contents = new ArrayCollection();
        $this->relatives = new ArrayCollection();
        $this->user = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }


    /**
     * @return Collection<int, Content>
     */
    public function getContents(): Collection
    {
        return $this->contents;
    }

    public function addContent(Content $content): self
    {
        if (!$this->contents->contains($content)) {
            $this->contents->add($content);
            $content->setCapsule($this);
        }

        return $this;
    }

    public function removeContent(Content $content): self
    {
        if ($this->contents->removeElement($content)) {
            // set the owning side to null (unless already changed)
            if ($content->getCapsule() === $this) {
                $content->setCapsule(null);
            }
        }

        return $this;
    }

    

    public function getCapsuleStatus(): ?string
    {
        return $this->capsule_status;
    }

    public function setCapsuleStatus(string $capsule_status): self
    {
        $this->capsule_status = $capsule_status;

        return $this;
    }

    public function getMailingDate(): ?\DateTimeInterface
    {
        return $this->mailing_date;
    }

    public function setMailingDate(\DateTimeInterface $mailing_date): self
    {
        $this->mailing_date = $mailing_date;

        return $this;
    }

    public function getFormat(): ?string
    {
        return $this->format;
    }

    public function setFormat(string $format): self
    {
        $this->format = $format;

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

    public function getSealDate(): ?\DateTimeInterface
    {
        return $this->seal_date;
    }

    public function setSealDate(\DateTimeInterface $seal_date): self
    {
        $this->seal_date = $seal_date;

        return $this;
    }

}
