-- Enable the pgcrypto extension to use gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Table: establishments
CREATE TABLE "establishments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "establishments_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "establishments_code_key" UNIQUE ("code")
);

-- Table: audit_templates
CREATE TABLE "audit_templates" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "establishment_type" TEXT NOT NULL,
    "template_data" JSONB NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "audit_templates_pkey" PRIMARY KEY ("id")
);

-- Table: audits
CREATE TABLE "audits" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "establishment_id" UUID NOT NULL,
    "audit_template_id" UUID NOT NULL,
    "status" TEXT NOT NULL,
    "start_date" TIMESTAMPTZ NOT NULL,
    "end_date" TIMESTAMPTZ,
    "final_score" INTEGER,
    "report_pdf_url" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "audits_pkey" PRIMARY KEY ("id")
);

-- Table: audit_items
CREATE TABLE "audit_items" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "audit_id" UUID NOT NULL,
    "template_item_id" TEXT NOT NULL,
    "answer" JSONB,
    "score" INTEGER,
    "comments" TEXT,
    "attachments" JSONB,
    "last_updated_by" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "audit_items_pkey" PRIMARY KEY ("id")
);

-- Table: audit_collaborators
CREATE TABLE "audit_collaborators" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "audit_id" UUID NOT NULL,
    "auditor_name" TEXT NOT NULL,
    "joined_at" TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT "audit_collaborators_pkey" PRIMARY KEY ("id")
);

-- Foreign Keys
ALTER TABLE "audits" ADD CONSTRAINT "audits_establishment_id_fkey" FOREIGN KEY ("establishment_id") REFERENCES "establishments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "audits" ADD CONSTRAINT "audits_audit_template_id_fkey" FOREIGN KEY ("audit_template_id") REFERENCES "audit_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "audit_items" ADD CONSTRAINT "audit_items_audit_id_fkey" FOREIGN KEY ("audit_id") REFERENCES "audits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "audit_collaborators" ADD CONSTRAINT "audit_collaborators_audit_id_fkey" FOREIGN KEY ("audit_id") REFERENCES "audits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Trigger to automatically update the 'updatedAt' column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_establishments_updated_at BEFORE UPDATE ON "establishments" FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_audit_templates_updated_at BEFORE UPDATE ON "audit_templates" FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_audits_updated_at BEFORE UPDATE ON "audits" FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_audit_items_updated_at BEFORE UPDATE ON "audit_items" FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
