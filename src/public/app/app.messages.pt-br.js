(function () {

    'use strict';

    /**
     * translations - Configure application translations
     * @ngInject
     *
     */
    function translations ($translateProvider) {
        $translateProvider.translations('pt-br', {
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
                DO_LOGIN: "Fazer login"
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
                MATCH_PASSWORDS: "As senhas devem ser iguais"
            },
            // Users
            USER: {
                NAME: "Nome completo",
                EMAIL: "E-mail",
                USERNAME: "Nome de usuário",
                PASSWORD: "Senha",
                REPEAT_PASSWORD: "Confirmar senha"
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
            }
        });
        $translateProvider.preferredLanguage('pt-br');
        $translateProvider.useSanitizeValueStrategy('escape');
    }

    angular.module('hercules')
        .config(translations);

})();
