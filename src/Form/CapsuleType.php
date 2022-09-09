<?php

namespace App\Form;

use App\Entity\Capsule;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CapsuleType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name')
            ->add('capsule_status')
            ->add('mailing_date')
            ->add('format')
            ->add('creation_date')
            ->add('seal_date')
            ->add('user')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Capsule::class,
        ]);
    }
}
