<?php

namespace App\Form;

use App\Entity\Capsule;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CapsuleType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name')
            ->add('capsule_status', ChoiceType::class, [
                'choices'  => [
                    'Scellée' => 'SEALED',
                    'Descellée' => 'UNSEALED',
                ],
                'expanded' => true,
            ])
            ->add('mailing_date', DateType::class, [
                'widget' => 'single_text',
                // 'html5' => false,
                // 'attr' => ['class' => 'js-datepicker'],
            ])
            ->add('format', ChoiceType::class, [
                'choices'  => [
                    'Numérique' => 'VIRTUAL',
                    'Physique' => 'SOLID',
                ],
                'expanded' => true,
            ])
            ->add('creation_date')
            ->add('seal_date')
            /* ->add('user', EntityType::class, [
                'class' => 'App\Entity\User',
                'mapped' => true,
                'multiple' => true,
                'expanded' => true
            ]) */
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Capsule::class,
        ]);
    }
}
