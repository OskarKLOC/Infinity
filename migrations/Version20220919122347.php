<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220919122347 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE address (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, road VARCHAR(255) NOT NULL, postcode VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, address_type VARCHAR(255) NOT NULL, INDEX IDX_D4E6F81A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE capsule (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) DEFAULT NULL, capsule_status VARCHAR(255) DEFAULT NULL, mailing_date DATETIME DEFAULT NULL, format VARCHAR(255) DEFAULT NULL, creation_date DATETIME DEFAULT NULL, seal_date DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE capsule_user (id INT AUTO_INCREMENT NOT NULL, capsule_id INT DEFAULT NULL, user_id INT DEFAULT NULL, is_owner TINYINT(1) NOT NULL, INDEX IDX_6C2F3D24714704E9 (capsule_id), INDEX IDX_6C2F3D24A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE content (id INT AUTO_INCREMENT NOT NULL, capsule_id INT DEFAULT NULL, content_name VARCHAR(255) NOT NULL, content_type VARCHAR(255) NOT NULL, caption LONGTEXT NOT NULL, url VARCHAR(255) NOT NULL, creation_date DATETIME NOT NULL, edit_time DATETIME NOT NULL, contenus_status VARCHAR(255) NOT NULL, INDEX IDX_FEC530A9714704E9 (capsule_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE offer (id INT AUTO_INCREMENT NOT NULL, offer_name VARCHAR(255) NOT NULL, price VARCHAR(255) NOT NULL, option_1 VARCHAR(255) NOT NULL, option_2 VARCHAR(255) DEFAULT NULL, option_3 VARCHAR(255) DEFAULT NULL, virtual_max SMALLINT DEFAULT NULL, solid_max SMALLINT DEFAULT NULL, recipients_max SMALLINT DEFAULT NULL, storage_max SMALLINT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, offer_id INT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, lastname VARCHAR(100) DEFAULT NULL, firstname VARCHAR(100) DEFAULT NULL, birth_city VARCHAR(255) DEFAULT NULL, phone_number VARCHAR(12) DEFAULT NULL, user_type VARCHAR(255) DEFAULT NULL, commitment TINYINT(1) DEFAULT NULL, signature VARCHAR(255) DEFAULT NULL, registration_date DATETIME DEFAULT NULL, birthdate DATE DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), INDEX IDX_8D93D64953C674EE (offer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_user (user_source INT NOT NULL, user_target INT NOT NULL, INDEX IDX_F7129A803AD8644E (user_source), INDEX IDX_F7129A80233D34C1 (user_target), PRIMARY KEY(user_source, user_target)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE address ADD CONSTRAINT FK_D4E6F81A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE capsule_user ADD CONSTRAINT FK_6C2F3D24714704E9 FOREIGN KEY (capsule_id) REFERENCES capsule (id)');
        $this->addSql('ALTER TABLE capsule_user ADD CONSTRAINT FK_6C2F3D24A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE content ADD CONSTRAINT FK_FEC530A9714704E9 FOREIGN KEY (capsule_id) REFERENCES capsule (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64953C674EE FOREIGN KEY (offer_id) REFERENCES offer (id)');
        $this->addSql('ALTER TABLE user_user ADD CONSTRAINT FK_F7129A803AD8644E FOREIGN KEY (user_source) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_user ADD CONSTRAINT FK_F7129A80233D34C1 FOREIGN KEY (user_target) REFERENCES user (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE address DROP FOREIGN KEY FK_D4E6F81A76ED395');
        $this->addSql('ALTER TABLE capsule_user DROP FOREIGN KEY FK_6C2F3D24714704E9');
        $this->addSql('ALTER TABLE capsule_user DROP FOREIGN KEY FK_6C2F3D24A76ED395');
        $this->addSql('ALTER TABLE content DROP FOREIGN KEY FK_FEC530A9714704E9');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64953C674EE');
        $this->addSql('ALTER TABLE user_user DROP FOREIGN KEY FK_F7129A803AD8644E');
        $this->addSql('ALTER TABLE user_user DROP FOREIGN KEY FK_F7129A80233D34C1');
        $this->addSql('DROP TABLE address');
        $this->addSql('DROP TABLE capsule');
        $this->addSql('DROP TABLE capsule_user');
        $this->addSql('DROP TABLE content');
        $this->addSql('DROP TABLE offer');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_user');
    }
}
