CREATE SEQUENCE seq_ra START 1;
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE Aluno (
    id_aluno SERIAL PRIMARY KEY,
    ra VARCHAR (7) UNIQUE NOT NULL,
    nome_aluno VARCHAR (100) NOT NULL,
    data_nascimento DATE,
	celular VARCHAR (20),
	email VARCHAR (80) NOT NULL,
  	status_aluno BOOLEAN DEFAULT TRUE
);


CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar a trigger trg_gerar_ra apenas se não existir
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_gerar_ra') THEN
        CREATE TRIGGER trg_gerar_ra
        BEFORE INSERT ON Aluno
        FOR EACH ROW EXECUTE FUNCTION gerar_ra();
    END IF;
END $$;

CREATE TABLE Curso (
	id_curso SERIAL PRIMARY KEY,
	nome_curso VARCHAR (100) NOT NULL,
	duracao_curso VARCHAR (40) NOT NULL,
	categorizacao VARCHAR (100) NOT NULL,
	status_matricula BOOLEAN DEFAULT TRUE
);


CREATE TABLE Matricula (
    id_matricula SERIAL PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno),
    id_curso INT REFERENCES Curso(id_curso),
    data_matricula DATE NOT NULL,
	status_matricula BOOLEAN DEFAULT TRUE
);


INSERT INTO Aluno (nome_aluno, data_nascimento, celular, email) 
VALUES 
('Yuri Dinato','2007-7-29', '16996301067', 'yuridinato@gmail.com'),
('Yago Dinato' ,'2007-7-29', '16996469015', 'yagodinato@gmail.com'),
('Pedro Henrique Alves', '2007-08-17', '1699267875', 'pa2891@gmail.com'),
('Natalie Portman', '2008-3-22', '16993930703', 'natalieportman@gmail.com');

SELECT * FROM Aluno;

INSERT INTO Curso (nome_curso, duracao_curso , categorizacao )
VALUES 
	('Analise e Desenvolvimento de Sistemas', '2 Anos', 'TI'),
	('Ciência da Computação', '4 Anos', 'TI'),
	('Engenharia Elétrica', '4 Anos', 'Exatas'),
	('Educação Física Bacharelado e Licenciatura', '4 anos', 'Linguagens')

SELECT * FROM curso;

INSERT INTO Matricula (id_aluno, id_curso, data_matricula)
VALUES 
('1', '2', '2026-02-01'),
('2', '1', '2026-05-01'),
('3', '4', '2026-05-12'),
('4', '3', '2026-03-7');



-- CREATE USUARIOS
CREATE TABLE IF NOT EXISTS Usuario (
    id_usuario SERIAL PRIMARY KEY,
    uuid UUID DEFAULT gen_random_uuid() NOT NULL,
    nome VARCHAR(70) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(50) NOT NULL
);

-- Criar a função gerar_senha_padrao apenas se não existir
CREATE OR REPLACE FUNCTION gerar_senha_padrao()
RETURNS TRIGGER AS $$
BEGIN
    NEW.senha := NEW.username || '1234';
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar a trigger trigger_gerar_senha apenas se não existir
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_gerar_senha') THEN
        CREATE TRIGGER trigger_gerar_senha
        BEFORE INSERT ON Usuario
        FOR EACH ROW
        EXECUTE FUNCTION gerar_senha_padrao();
    END IF;
END $$;

-- Inserindo usuarios
INSERT INTO usuario (nome, username, email) 
VALUES
('João Silva', 'joao.silva', 'joao.silva@email.com'),
('Maria Oliveira', 'maria.oliveira', 'maria.oliveira@email.com'),
('Carlos Souza', 'carlos.souza', 'carlos.souza@email.com');

SELECT * FROM usuario;

	


