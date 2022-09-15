<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220913131611 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE address CHANGE adress_type address_type VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE capsule CHANGE name name VARCHAR(255) DEFAULT NULL, CHANGE capsule_status capsule_status VARCHAR(255) DEFAULT NULL, CHANGE mailing_date mailing_date DATETIME DEFAULT NULL, CHANGE format format VARCHAR(255) DEFAULT NULL, CHANGE creation_date creation_date DATETIME DEFAULT NULL, CHANGE seal_date seal_date DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE address CHANGE address_type adress_type VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE capsule CHANGE name name VARCHAR(255) NOT NULL, CHANGE capsule_status capsule_status VARCHAR(255) NOT NULL, CHANGE mailing_date mailing_date DATETIME NOT NULL, CHANGE format format VARCHAR(255) NOT NULL, CHANGE creation_date creation_date DATETIME NOT NULL, CHANGE seal_date seal_date DATETIME NOT NULL');
    }
}
