-- answers table creation
CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    answer TEXT NOT NULL
);

-- copy from CSV file
\copy answers(id, answer) FROM '/docker-entrypoint-initdb.d/answers.csv' CSV HEADER;

-- atoq table creation
CREATE TABLE atoq (
    next_questionid INTEGER NOT NULL,
    answerid INTEGER NOT NULL,
    PRIMARY KEY (next_questionid, answerid)
);

-- copy from CSV file
\copy atoq(next_questionid, answerid) FROM '/docker-entrypoint-initdb.d/atoq.csv' CSV HEADER;

-- q_appearance table creation
CREATE TABLE q_appearance (
    questionid SERIAL PRIMARY KEY,
    answer_type INTEGER,
    input_type TEXT
);

-- copy from CSV file
\copy q_appearance(questionid, answer_type,input_type) FROM '/docker-entrypoint-initdb.d/q_appearance.csv' CSV HEADER;

-- qtoa table creation
CREATE TABLE qtoa (
    answerid INTEGER NOT NULL,
    questionid INTEGER NOT NULL,
    PRIMARY KEY (answerid, questionid)
);

-- copy from CSV file
\copy qtoa(answerid, questionid) FROM '/docker-entrypoint-initdb.d/qtoa.csv' CSV HEADER;

-- questions table creation
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    page TEXT,
    question TEXT
);

-- copy from CSV file
\copy questions(id, page, question) FROM '/docker-entrypoint-initdb.d/questions.csv' CSV HEADER;

-- users_answers table creation
CREATE TABLE users_answers (
    user_id INTEGER PRIMARY KEY,
    answers JSONB
);

-- users_email table creation
CREATE TABLE users_email (
    user_id INTEGER NOT NULL,
    email TEXT,
    password TEXT,
    company_id INTEGER NOT NULL,
    isdone BOOLEAN,
    email_date TEXT,
    PRIMARY KEY (user_id, company_id)
);

-- company_info table creation
CREATE TABLE company_info (
    company_id VARCHAR(22) NOT NULL,
    "Referent email" VARCHAR(255),
    "Password" VARCHAR(64),
    "Salt" VARCHAR(32),
    "Organizations name" TEXT,
    "Organizations domain" TEXT,
    "Year of establishment" INTEGER,
    "The organization is local or global" TEXT,
    "Branch location" TEXT,
    "Name of Survey" TEXT,
    "First name" TEXT,
    "Last name" TEXT,
    "Product Development vs Purchase Decision" TEXT,
    "Business type" TEXT,
    "High level management" INTEGER,
    "Middle level management" INTEGER,
    "Employees" INTEGER,
    PRIMARY KEY (company_id)
);
