<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220913141234 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE capsule_user (id INT AUTO_INCREMENT NOT NULL, capsule_id INT DEFAULT NULL, user_id INT DEFAULT NULL, is_owner TINYINT(1) NOT NULL, INDEX IDX_6C2F3D24714704E9 (capsule_id), INDEX IDX_6C2F3D24A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE capsule_user ADD CONSTRAINT FK_6C2F3D24714704E9 FOREIGN KEY (capsule_id) REFERENCES capsule (id)');
        $this->addSql('ALTER TABLE capsule_user ADD CONSTRAINT FK_6C2F3D24A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE capsule_user DROP FOREIGN KEY FK_6C2F3D24714704E9');
        $this->addSql('ALTER TABLE capsule_user DROP FOREIGN KEY FK_6C2F3D24A76ED395');
        $this->addSql('DROP TABLE capsule_user');
    }
}
