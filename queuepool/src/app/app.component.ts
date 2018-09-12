import { Component } from '@angular/core';
import { QueueService } from './services/queue.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public tiradentesList: string[] = [];
  public apoloList: string[] = [];
  public isModalOpen = false;
  public queueName = '';
  public player1Name = '';
  public player2Name = '';

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

  public closeDialog() {
    this.isModalOpen = false;
    this.queueName = '';
  }

  public sendPlayersNames() {
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
            alert('Erro ao entrar');
          }
        );
      } else {
        alert('É preciso inserir pelo menos 1 nome');
      }
    } else {
      alert('Fila inválida');
    }
  }
}
