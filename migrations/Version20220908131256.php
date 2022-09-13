<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220908131256 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user CHANGE lastname lastname VARCHAR(100) DEFAULT NULL, CHANGE firstname firstname VARCHAR(100) DEFAULT NULL, CHANGE birthdate birthdate DATETIME DEFAULT NULL, CHANGE birth_city birth_city VARCHAR(255) DEFAULT NULL, CHANGE phone_number phone_number VARCHAR(10) DEFAULT NULL, CHANGE user_type user_type VARCHAR(255) DEFAULT NULL, CHANGE signature signature VARCHAR(255) DEFAULT NULL, CHANGE registration_date registration_date DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user CHANGE lastname lastname VARCHAR(100) NOT NULL, CHANGE firstname firstname VARCHAR(100) NOT NULL, CHANGE birthdate birthdate DATETIME NOT NULL, CHANGE birth_city birth_city VARCHAR(255) NOT NULL, CHANGE phone_number phone_number VARCHAR(10) NOT NULL, CHANGE user_type user_type VARCHAR(255) NOT NULL, CHANGE signature signature VARCHAR(255) NOT NULL, CHANGE registration_date registration_date DATETIME NOT NULL');
    }
}
