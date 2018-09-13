import { Component } from '@angular/core';
import { QueueService } from './services/queue.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public tiradentesList: any[] = [];
  public apoloList: any[] = [];
  public isModalOpen = false;
  public isPartnerModalOpen = false;
  public isClickDisabled = false;
  public queueName = '';
  public player1Name = '';
  public player2Name = '';
  public playerName = '';
  public partner: any;

  constructor(private queueService: QueueService) {
    this.checkListStatus();
    setInterval(() => { this.checkListStatus(); }, 20000);
  }

  private checkListStatus() {
    this.queueService.getQueues().subscribe(
      results => {
        this.tiradentesList = results.body.tiradentes;
        this.apoloList = results.body.apolo;
      }
    );
  }

  public openDialog(queueName: string) {
    this.isModalOpen = true;
    this.queueName = queueName;
  }

  public openPartnerDialog(queueName: string, partner: any) {
    this.isPartnerModalOpen = true;
    this.partner = partner;
    this.queueName = queueName;
  }

  public closePartnerDialog() {
    this.isPartnerModalOpen = false;
    this.queueName = '';
    this.playerName = '';
  }

  public closeDialog() {
    this.isModalOpen = false;
    this.queueName = '';
    this.player1Name = '';
    this.player2Name = '';
  }

  public sendPlayersNames() {
    this.isClickDisabled = true;
    if (this.queueName !== '') {
      if (this.player1Name !== '' || this.player2Name !== '') {
        const players = {
          playerone: this.player1Name,
          playertwo: this.player2Name
        };
        this.queueService.sendNames(this.queueName, players).subscribe(
          result => {
            this.closeDialog();
            window.location.reload();
          },
          error => {
            alert('Erro ao adicionar jogador na fila');
            this.isClickDisabled = false;
          }
        );
      } else {
        alert('É preciso inserir pelo menos 1 nome');
        this.isClickDisabled = false;
      }
    } else {
      alert('Fila inválida');
      this.isClickDisabled = false;
    }
  }

  public sendPartner() {
    this.isClickDisabled = true;
    if (this.queueName !== '') {
      if (this.playerName !== '') {
        this.queueService.sendPartner(this.queueName, this.playerName, this.partner.id).subscribe(
          result => {
            this.closePartnerDialog();
            window.location.reload();
          },
          error => {
            alert('Erro ao adicionar jogador na fila');
            this.isClickDisabled = false;
          }
        );
      } else {
        alert('Insira o nome do jogador');
        this.isClickDisabled = false;
      }
    } else {
      alert('Fila inválida');
      this.isClickDisabled = false;
    }
  }

  public removePlayer(queue: string, id: string) {
    if (confirm('Tem certeza que deseja excluir o jogador?')) {
      this.queueService.deletePlayer(queue, id).subscribe(
        result => {
          alert('Excluído com sucesso');
          window.location.reload();
        },
        error => {
          alert('Falha ao excluir');
        }
      );
    }
  }

  public removeTeam(queue: string, queueList: any) {
    const teamOnTop = queueList[0];
    if (confirm(teamOnTop[0].name + ' e ' + teamOnTop[1].name + ' iniciaram o jogo?')) {
      this.queueService.removeTeam(queue, teamOnTop[0].id, teamOnTop[1].id).subscribe(
        result => {
          alert('Excluído com sucesso');
          window.location.reload();
        },
        error => {
          alert('Falha ao excluir');
        }
      );
    }
  }
}
