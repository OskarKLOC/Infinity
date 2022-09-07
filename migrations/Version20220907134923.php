<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220907134923 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE adress (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, road VARCHAR(255) NOT NULL, postcode VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, adress_type VARCHAR(255) NOT NULL, INDEX IDX_5CECC7BEA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE capsule (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, capsule_status VARCHAR(255) NOT NULL, mailing_date DATETIME NOT NULL, format VARCHAR(255) NOT NULL, creation_date DATETIME NOT NULL, seal_date DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE capsule_user (capsule_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_6C2F3D24714704E9 (capsule_id), INDEX IDX_6C2F3D24A76ED395 (user_id), PRIMARY KEY(capsule_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE content (id INT AUTO_INCREMENT NOT NULL, capsule_id INT DEFAULT NULL, content_name VARCHAR(255) NOT NULL, content_type VARCHAR(255) NOT NULL, caption LONGTEXT NOT NULL, url VARCHAR(255) NOT NULL, creation_date DATETIME NOT NULL, edit_time DATETIME NOT NULL, contenus_status VARCHAR(255) NOT NULL, INDEX IDX_FEC530A9714704E9 (capsule_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE offer (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, offer_name VARCHAR(255) NOT NULL, price VARCHAR(255) NOT NULL, option_1 VARCHAR(255) NOT NULL, option_2 VARCHAR(255) DEFAULT NULL, option_3 VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_29D6873EA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, lastname VARCHAR(100) NOT NULL, firstname VARCHAR(100) NOT NULL, birthdate DATETIME NOT NULL, birth_city VARCHAR(255) NOT NULL, phone_number VARCHAR(10) NOT NULL, user_type VARCHAR(255) NOT NULL, commitment TINYINT(1) NOT NULL, signature VARCHAR(255) NOT NULL, registration_date DATETIME NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE adress ADD CONSTRAINT FK_5CECC7BEA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE capsule_user ADD CONSTRAINT FK_6C2F3D24714704E9 FOREIGN KEY (capsule_id) REFERENCES capsule (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE capsule_user ADD CONSTRAINT FK_6C2F3D24A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE content ADD CONSTRAINT FK_FEC530A9714704E9 FOREIGN KEY (capsule_id) REFERENCES capsule (id)');
        $this->addSql('ALTER TABLE offer ADD CONSTRAINT FK_29D6873EA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE adress DROP FOREIGN KEY FK_5CECC7BEA76ED395');
        $this->addSql('ALTER TABLE capsule_user DROP FOREIGN KEY FK_6C2F3D24714704E9');
        $this->addSql('ALTER TABLE capsule_user DROP FOREIGN KEY FK_6C2F3D24A76ED395');
        $this->addSql('ALTER TABLE content DROP FOREIGN KEY FK_FEC530A9714704E9');
        $this->addSql('ALTER TABLE offer DROP FOREIGN KEY FK_29D6873EA76ED395');
        $this->addSql('DROP TABLE adress');
        $this->addSql('DROP TABLE capsule');
        $this->addSql('DROP TABLE capsule_user');
        $this->addSql('DROP TABLE content');
        $this->addSql('DROP TABLE offer');
        $this->addSql('DROP TABLE user');
    }
}
