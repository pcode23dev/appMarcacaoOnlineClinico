import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PedidoMarcacao, Utente } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() {}

  async exportarPedidoMarcacao(pedido: PedidoMarcacao, utente?: Utente): Promise<void> {
    const pdf = new jsPDF();
    
    // Cabeçalho
    pdf.setFontSize(20);
    pdf.text('Clínica XPTO', 20, 20);
    pdf.setFontSize(16);
    pdf.text('Comprovativo de Marcação', 20, 35);
    
    // Linha divisória
    pdf.line(20, 45, 190, 45);
    
    // Informações do pedido
    pdf.setFontSize(12);
    let yPosition = 60;
    
    pdf.text(`Número do Pedido: ${pedido.id}`, 20, yPosition);
    yPosition += 10;
    
    pdf.text(`Data de Submissão: ${new Date(pedido.dataSubmissao).toLocaleDateString('pt-PT')}`, 20, yPosition);
    yPosition += 10;
    
    pdf.text(`Estado: ${pedido.estado}`, 20, yPosition);
    yPosition += 10;
    
    if (pedido.dataAgendada) {
      pdf.text(`Data Agendada: ${new Date(pedido.dataAgendada).toLocaleDateString('pt-PT')}`, 20, yPosition);
      yPosition += 10;
    }
    
    // Informações do utente
    yPosition += 10;
    pdf.setFontSize(14);
    pdf.text('Dados do Utente:', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(12);
    if (utente) {
      pdf.text(`Nome: ${utente.nome}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Email: ${utente.email}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Telefone: ${utente.telefone}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Número de Utente: ${utente.numeroUtente}`, 20, yPosition);
      yPosition += 8;
    } else if (pedido.utenteTempData) {
      pdf.text(`Nome: ${pedido.utenteTempData.nome}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Email: ${pedido.utenteTempData.email}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Telefone: ${pedido.utenteTempData.telefone}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Número de Utente: ${pedido.utenteTempData.numeroUtente}`, 20, yPosition);
      yPosition += 8;
    }
    
    // Atos clínicos
    yPosition += 10;
    pdf.setFontSize(14);
    pdf.text('Atos Clínicos:', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(12);
    pedido.atos.forEach((ato, index) => {
      pdf.text(`${index + 1}. ${ato.tipo}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`   Subsistema: ${ato.subSistema}`, 25, yPosition);
      yPosition += 8;
      if (ato.profissional) {
        pdf.text(`   Profissional: ${ato.profissional}`, 25, yPosition);
        yPosition += 8;
      }
      yPosition += 5;
    });
    
    // Preferências
    yPosition += 10;
    pdf.setFontSize(14);
    pdf.text('Preferências:', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(12);
    pdf.text(`Intervalo de Datas: ${pedido.intervaloDatas}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Horário Preferido: ${pedido.horarioPreferido}`, 20, yPosition);
    yPosition += 8;
    
    if (pedido.observacoes) {
      yPosition += 5;
      pdf.text('Observações:', 20, yPosition);
      yPosition += 8;
      const observacoes = pdf.splitTextToSize(pedido.observacoes, 170);
      pdf.text(observacoes, 20, yPosition);
    }
    
    // Rodapé
    const pageHeight = pdf.internal.pageSize.height;
    pdf.setFontSize(10);
    pdf.text('Este documento foi gerado automaticamente pelo sistema da Clínica XPTO', 20, pageHeight - 20);
    pdf.text(`Gerado em: ${new Date().toLocaleDateString('pt-PT')} às ${new Date().toLocaleTimeString('pt-PT')}`, 20, pageHeight - 10);
    
    // Salvar o PDF
    pdf.save(`marcacao-${pedido.id}-${new Date().toISOString().split('T')[0]}.pdf`);
  }

  async exportarHistoricoMarcacoes(pedidos: PedidoMarcacao[], utente: Utente): Promise<void> {
    const pdf = new jsPDF();
    
    // Cabeçalho
    pdf.setFontSize(20);
    pdf.text('Clínica XPTO', 20, 20);
    pdf.setFontSize(16);
    pdf.text('Histórico de Marcações', 20, 35);
    
    // Linha divisória
    pdf.line(20, 45, 190, 45);
    
    // Informações do utente
    pdf.setFontSize(14);
    let yPosition = 60;
    pdf.text('Utente:', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(12);
    pdf.text(`Nome: ${utente.nome}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Número de Utente: ${utente.numeroUtente}`, 20, yPosition);
    yPosition += 20;
    
    // Lista de marcações
    pdf.setFontSize(14);
    pdf.text('Marcações:', 20, yPosition);
    yPosition += 15;
    
    pedidos.forEach((pedido, index) => {
      if (yPosition > 250) { // Nova página se necessário
        pdf.addPage();
        yPosition = 20;
      }
      
      pdf.setFontSize(12);
      pdf.text(`${index + 1}. Pedido #${pedido.id} - ${pedido.estado}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Data: ${new Date(pedido.dataSubmissao).toLocaleDateString('pt-PT')}`, 25, yPosition);
      yPosition += 8;
      
      pedido.atos.forEach(ato => {
        pdf.text(`• ${ato.tipo} (${ato.subSistema})`, 25, yPosition);
        yPosition += 6;
      });
      
      yPosition += 10;
    });
    
    // Rodapé
    const pageHeight = pdf.internal.pageSize.height;
    pdf.setFontSize(10);
    pdf.text('Este documento foi gerado automaticamente pelo sistema da Clínica XPTO', 20, pageHeight - 20);
    pdf.text(`Gerado em: ${new Date().toLocaleDateString('pt-PT')} às ${new Date().toLocaleTimeString('pt-PT')}`, 20, pageHeight - 10);
    
    // Salvar o PDF
    pdf.save(`historico-marcacoes-${utente.numeroUtente}-${new Date().toISOString().split('T')[0]}.pdf`);
  }

  async exportarElementoHTML(elementId: string, nomeArquivo: string): Promise<void> {
    const elemento = document.getElementById(elementId);
    if (!elemento) {
      throw new Error(`Elemento com ID '${elementId}' não encontrado`);
    }

    const canvas = await html2canvas(elemento);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF();
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save(nomeArquivo);
  }
}