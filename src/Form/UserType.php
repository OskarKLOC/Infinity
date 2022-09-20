<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\BirthdayType;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email')
            ->add('roles', ChoiceType::class, [
                'choices' => [
                     'admin'=>'ROLE_ADMIN',
                     'propriétaire'=>'ROLE_PROPRIETAIRE' ,
                     'proche'=>'ROLE_PROCHE' 

                ],
                'multiple' => true
            ])
            ->add('password')
            ->add('lastname')
            ->add('firstname')
            ->add('birthdate', BirthdayType::class, [
                //'widget' => 'choice',
                'years' => range(1904, 2022),
                'format' => 'dd/MM/yyyy'
            ])
            ->add('birth_city')
            ->add('phone_number')
            ->add('user_type')
            ->add('commitment')
            ->add('signature')
            ->add('registration_date')
            //->add('capsules')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
