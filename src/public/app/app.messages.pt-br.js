(function () {

    'use strict';

    /**
     * translations - Configure application translations
     * @ngInject
     *
     */
    function translations ($translateProvider) {

        var dictionary = {
            // Actions
            ACTION: {
                ADD: "Adicionar",
                EDIT: "Editar",
                DELETE: "Excluir",
                REGISTER: "Cadastre-se",
                SAVE: "Cadastrar",
                UPDATE: "Atualizar",
                BACK: "Voltar",
                SELECT: "Selecione uma opção",
                CANCEL: "Cancelar",
                LOGIN: "Entrar",
                DO_LOGIN: "Fazer login",
                SELECT_THEME: "Selecione um conteúdo",
                PREVIEW: "Pré-visualizar",
                PRINT: "Imprimir",
                DOWNLOAD: {
                    PDF: "Baixar como PDF"
                },
                SEARCH_THEME: "Procurar conteúdos",
                LOGOUT: "Sair"
            },
            // Lists
            LIST: {
                ITEM_SELECTED: "1 item selecionado",
                ZERO_DATA: "Nenhum registro encontrado"
            },
            // Validations
            VALIDATION: {
                REQUIRED: "Este campo é obrigatório",
                MIN_LENGTH: "Este campo deve ter ao menos {{value}} caracteres",
                MAX_LENGTH: "Este campo deve ter no máximo {{value}} caracteres",
                YEAR: "Informe um ano válido",
                MIN: "O valor deve ser maior ou igual a {{value}}",
                MAX: "O valor deve ser menor ou igual a {{value}}",
                EMAIL: "Informe um e-mail válido",
                EMAIL_EXISTS: "O e-mail informado já existe no sistema",
                MATCH_PASSWORDS: "As senhas devem ser iguais",
                THEME_REQUIRED: "Você deve escolher um conteúdo",
                THEME_EXISTENT: "Escolha um conteúdo existente",
                THEME_NOT_FOUND: "Não foi encontrado nenhum conteúdo contendo \"{{value}}\""

            },
            // Users
            USER: {
                NAME: "Nome completo",
                EMAIL: "E-mail",
                USERNAME: "Nome de usuário",
                PASSWORD: "Senha",
                REPEAT_PASSWORD: "Confirmar senha",
                PROFILE: "Meus dados"
            },
            // Disciplines
            DISCIPLINE: {
                ENTITY: "Disciplina",
                ENTITY_PLURAL: "Disciplinas",
                NAME: "Nome",
                YEAR_SEMESTER: "Ano/Semestre",
                STUDENT_NUMBER: "Nº de alunos",
                YEAR: "Ano",
                SEMESTER: "Semestre",
                STUDENTS: "Alunos",
                STUDENT: "Aluno",
                STUDENT_NAME: "Nome do aluno"
            },
            // Themes
            THEME: {
                ENTITY: "Conteúdo",
                ENTITY_PLURAL: "Conteúdos",
                NAME: "Nome"
            },
            // Questions
            QUESTION: {
                ENTITY: "Questão",
                ENTITY_PLURAL: "Questões",
                NAME: "Enunciado",
                THEME: "Conteúdo",
                CORRECT_OPTION: "Alternativa correta",
                CORRECT_OPTION_QUESTION: "Alternativa correta?",
                OPTION: "Alternativa",
                OPTIONS: "Alternativas",
                OPTION_NUMBER: "Alternativa nº {{value}}",
                CORRECT: "Correta",
                WRONG: "Errada"
            },
            // Tests
            TEST: {
                ENTITY: "Prova",
                ENTITY_PLURAL: "Provas",
                NAME: "Nome",
                DATE: {
                    BEGIN: "Data de início",
                    END: "Data de término"
                },
                DATETIME: {
                    BEGIN: "Data e horário de início",
                    END: "Data e horário de término"
                },
                DISCIPLINE: "Disciplina",
                QUESTION_NUMBER: "Qtd. de questões",
                THEMES: "Conteúdos",
                QUESTIONS: "Questões"
            },
            DASHBOARD: "Painel"
        };

        $translateProvider
            .translations('pt-br', dictionary)
            .preferredLanguage('pt-br')
            .useSanitizeValueStrategy('escape');

    }

    angular.module('hercules')
        .config(translations);

})();
