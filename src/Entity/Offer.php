<?php

namespace App\Entity;

use App\Repository\OfferRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OfferRepository::class)]
class Offer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $offer_name = null;

    #[ORM\Column(length: 255)]
    private ?string $price = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?User $user = null;

    #[ORM\Column(length: 255)]
    private ?string $option_1 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $option_2 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $option_3 = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOfferName(): ?string
    {
        return $this->offer_name;
    }

    public function setOfferName(string $offer_name): self
    {
        $this->offer_name = $offer_name;

        return $this;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(string $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getOption1(): ?string
    {
        return $this->option_1;
    }

    public function setOption1(string $option_1): self
    {
        $this->option_1 = $option_1;

        return $this;
    }

    public function getOption2(): ?string
    {
        return $this->option_2;
    }

    public function setOption2(?string $option_2): self
    {
        $this->option_2 = $option_2;

        return $this;
    }

    public function getOption3(): ?string
    {
        return $this->option_3;
    }

    public function setOption3(?string $option_3): self
    {
        $this->option_3 = $option_3;

        return $this;
    }
}
