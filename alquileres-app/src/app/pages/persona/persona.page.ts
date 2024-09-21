import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { ModalContentPage } from './modal/persona.modal';
import { OverlayEventDetail } from '@ionic/core/components';
import Persona from '../../models/Persona'
import { PersonaService } from 'src/app/services/persona/persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.page.html',
  styleUrls: ['./persona.page.scss'],
})
export class PersonaPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  
  constructor(private personaService: PersonaService, private alertController: AlertController, private modalController: ModalController) { }
  
  ListadoPersona!: Persona[];
  persona!: Persona
  passwordEncripted: string= ''

  ngOnInit() {
      this.personaService.getAllPersona().subscribe((persona: Persona[])=>{
      this.ListadoPersona = persona;
    })
  }

  async openModal(persona?: Persona) {
    const modal = await this.modalController.create({
      component: ModalContentPage,
      componentProps: {
        persona: persona,
        id_usuario: persona ? persona.id_usuario  : 0,
        nombre: persona ? persona.nombre : '',
        apellido: persona ? persona.apellido : '',
        email: persona ? persona.email : '',
        password: persona ? persona.password: '',
        telefono: persona ? persona.telefono : '',
        domicilio: persona ? persona.domicilio : '',
        tipoUsuario: persona ? persona.tipo_usuario : ''
      }
    })
  
    modal.onDidDismiss().then((dataPersona: any) => {
      
      if (dataPersona.data) {
        const personaData= dataPersona.data
        if (persona) {
          //Actualizo Persona
          persona.nombre= personaData.nombre
          persona.apellido= personaData.apellido
          persona.email= personaData.email
          persona.tipo_usuario= personaData.tipo_usuario
          persona.telefono= personaData.telefono
          persona.domicilio= personaData.domicilio
        
          this.personaService.updatePersona(persona).subscribe((persona: Persona)=>{
            const index = this.ListadoPersona.findIndex(p => p.id_usuario === persona.id_usuario);
            if (index !== -1) {
              this.ListadoPersona[index] = persona;
            }
          })
        } else {
          //Creo una Persona
          let nuevaPersona = new Persona( 
            personaData.id_usuario,           // id_usuario, el schema de la tabla es autoincremental, lo paso en 0 solo por el modelo Persona  
            personaData.nombre,
            personaData.apellido,
            personaData.email,
            '',                               // password, se crea cuando se registra el usuario
            personaData.tipo_usuario,
            personaData.telefono,
            personaData.domicilio
          );
          
          this.personaService.addPersona(nuevaPersona).subscribe((persona: Persona)=>{
            this.ListadoPersona.push(persona);
            this.persona = persona;
          })
        }
      }
    });

    return await modal.present();
  }

  async deletePersona(persona: Persona) {
    console.log(persona)
    const alert = await this.alertController.create({
      header: 'Eliminar a ' + persona.nombre + ' ' + persona.apellido + '?',
      message: 'Esta acción no puede deshacerse.',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.personaService.deletePersonaByid_usuario(persona.id_usuario).subscribe(() => {
              this.ListadoPersona = this.ListadoPersona.filter(p => p.id_usuario !== persona.id_usuario);
            });
          },
        },
      ],
    });
  
    await alert.present();
  }
  
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

}
