import React from "react";
import { Modal, Form, Button, Table, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Usuarios extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            nome: '',
            senha: '',
            email: '',
            telefone: '',
            modalAberta: false,
            mostraTabela: true,
            usuarios: []
        }

        this.deletarAluno = this.deletarAluno.bind(this);
        this.buscaAlunos = this.buscaAlunos.bind(this);
        this.cadastraAluno = this.cadastraAluno.bind(this);
        this.atualizaNome = this.atualizaNome.bind(this);
        this.atualizaSenha = this.atualizaSenha.bind(this);
        this.atualizaEmail = this.atualizaEmail.bind(this);
        this.atualizaTelefone = this.atualizaTelefone.bind(this);
        this.submit = this.submit.bind(this);
        this.fecharModal = this.fecharModal.bind(this);
        this.abrirModal = this.abrirModal.bind(this);
    }

    componentDidMount() {
        this.buscaAlunos();
    }

    buscaAlunos() {
        fetch("https://busfinder-v3.azure-api.net/api/usuarios")
            .then(resposta => resposta.json())
            .then(dados => {
                this.setState({ usuarios: dados })
            })
    }

    cadastraAluno(usuario) {
        fetch("https://busfinder-v3.azure-api.net/api/usuarios", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        }).then(resposta => {
            if (resposta.ok) {
                this.buscaAlunos();
            } else {
                alert('Não foi possível adicionar o usuario!');
            }
        })
    }

    carregarDados(id) {
        fetch("https://busfinder-v3.azure-api.net/api/usuarios" + id)
            .then(resposta => resposta.json())
            .then(usuario => {
                this.setState(
                    {
                        id: usuario.id,
                        nome: usuario.nome,
                        senha: usuario.senha,
                        email: usuario.email,
                        telefone: usuario.telefone
                    }
                )
                this.abrirModal()
            })
    }

    atualizarAluno(usuario) {
        fetch("https://busfinder-v3.azure-api.net/api/usuarios" + usuario.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        }).then(resposta => {
            if (resposta.ok) {
                this.buscaAlunos();
            } else {
                alert("Erro ao atualizar!");
            }
        })
    }

    deletarAluno(id) {
        fetch("https://busfinder-v3.azure-api.net/api/usuarios" + id, { method: 'DELETE' })
            .then((resposta) => {
                if (resposta.ok) {
                    this.buscaAlunos();
                }
            })
    }


    renderTabela() {

        const listaAlunos = this.state.usuarios.map((usuario) =>
            <tr key={usuario.id}>
                <td>{usuario.nome}</td>
                <td>{usuario.senha}</td>
                <td>{usuario.email}</td>
                <td>{usuario.telefone}</td>
                <td>
                    <Button icon="" class="bttable" variant="outline-primary" onClick={() => this.carregarDados(usuario.id)}>Atualizar</Button>
                    <Button class="bttable" variant="outline-dark" onClick={() => this.deletarAluno(usuario.id)}>Deletar</Button>
                </td>
            </tr>
        )


        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Senha</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {listaAlunos}
                </tbody>
            </Table>
        )

    }

    fecharModal() {
        this.setState({
            modalAberta: false,
            id: 0,
            nome: '',
            senha: '',
            email: '',
            telefone: ''
        })
    }

    abrirModal() {
        this.setState({
            modalAberta: true
        })
    }

    renderForm() {
        return (
            <Modal show={this.state.modalAberta} onHide={this.fecharModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Preencha os dados</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="cadastro">
                        <div class="mb-3">
                            <label class="form-label">Nome</label>
                            <input type="text" class="form-control" value={this.state.nome} onChange={this.atualizaNome}></input>
                            <br />
                            <label class="form-label">Senha</label>
                            <input type="password" class="form-control" value={this.state.senha} onChange={this.atualizaSenha}></input>
                            <br />
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" value={this.state.email} onChange={this.atualizaEmail}></input>
                            <br />
                            <label class="form-label">Telefone</label>
                            <input type="tel" class="form-control" value={this.state.telefone} onChange={this.atualizaTelefone}></input>
                            <br />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.fecharModal}>Cancelar</Button>
                    <Button form="cadastro" variant="primary" onClick={this.submit}>Confimar 2</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    atualizaNome(e) {
        this.setState(
            {
                nome: e.target.value
            }
        )
    }

   atualizaSenha(e) {
        this.setState(
            {
                senha: e.target.value
            }
        )
    }

    atualizaEmail(e) {
        this.setState(
            {
                email: e.target.value
            }
        )
    }

    atualizaTelefone(e) {
        this.setState(
            {
                telefone: e.target.value
            }
        )
    }

    submit() {
        const usuario = {
            id: this.state.id,
            nome: this.state.nome,
            senha: this.state.senha,
            email: this.state.email,
            telefone: this.state.telefone
        }
        if (this.state.id === 0) {
            this.cadastraAluno(usuario);
        } else {
            this.atualizarAluno(usuario);
        }
        this.fecharModal();
    }

    mostraTabela = () => {
        this.setState({
            mostraTabela: true
        })
    }

    mostraLista = () => {
        this.setState(
            { mostraTabela: false }
        )
    }

    render() {
        return (
            <div class="tabelaAlunos">
                <Button class="bt" variant="primary" onClick={this.abrirModal}>Adicionar Usuario</Button>
                <br />
                <br />
                {this.renderForm()}
                {this.renderTabela()}
            </div>
        )
    }
}


export default Usuarios;
