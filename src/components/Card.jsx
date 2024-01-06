import './Card.css'

export default function Card(props) {
    return (
        <div key={props.index} className="container-card">
            <img src={props.fornecedor.logo} alt='Logo da Empresa' />
            <p className="nome-fornecedor">{props.fornecedor.nome}</p>
            <p className="custo-fornecedor"> R$ {props.fornecedor.custo_por_kwh}</p>
            <p className="estado-fornecedor">Localidade:{props.fornecedor.estado_de_origem}</p>
            <p className="limite-fornecedor">Limite minimo de consumo: {props.fornecedor.limite_minimo_kwh}</p>
            <p className="clientes-fornecedor">Cliente ativos: {props.fornecedor.numero_total_de_clientes}</p>
            <p className="nota-fornecedor">Avaliação:{props.fornecedor.avaliacao_media_dos_clientes}</p>
        </div>
    )
}