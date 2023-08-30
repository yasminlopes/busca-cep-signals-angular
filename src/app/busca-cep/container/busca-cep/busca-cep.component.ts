import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { map, of, startWith } from 'rxjs';
import { BuscaCepService } from '../../service/busca-cep.service';
import { Endereco } from '../../models/endereco.model';
import { removerCaracteresEspeciais } from 'src/app/utils/removerCaracteresEspeciais';

@Component({
  selector: 'app-busca-cep',
  templateUrl: './busca-cep.component.html',
  styleUrls: ['./busca-cep.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BuscaCepComponent implements OnInit {

  public titulo = signal('Busca de CEP');
  public teste = signal({ nome: 'Yasmin', sobrenome: '' });
  public form!: FormGroup;
  public cep = signal('');

  private _formBuilder = inject(NonNullableFormBuilder);
  private _buscaCepService = inject(BuscaCepService);

  constructor() {
    this.titulo.set('Busca de CEP');
    this.titulo.update((value) => value + ' utilizando Signals!');

    setTimeout(() => {
      this.teste.mutate((value) => (value.sobrenome = 'Lopes'));
    }, 3000);

    effect(() => {
      console.log('effect =====>', this.cep());
    });
  }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  public get nome() {
    return this.teste().nome;
  }

  public get sobrenome() {
    return this.teste().sobrenome;
  }

  private iniciarFormulario() {
    this.form = this._formBuilder.group({
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      bairro: ['', Validators.required],
      localidade: ['', Validators.required],
      nonNullable: true,
    });
  }

  public buscarCep$ = computed(() => {
    const cep = removerCaracteresEspeciais(this.cep());
    if (cep?.length !== 8) return of('Digite um CEP válido');

    return this._buscaCepService.buscarCep(this.cep()).pipe(
      map((resposta) => {
        if (resposta.erro) {
          return 'Erro ao buscar CEP. Tente novamente!';
        }

        this.preencherDadosEndereco(resposta);

        return resposta;
      }),
      startWith('Carregando...')
    );
  })

  private preencherDadosEndereco(endereco: Endereco) {
    this.form.patchValue(
      {
        logradouro: endereco.logradouro,
        bairro: endereco.bairro,
        localidade: `${endereco.localidade} - ${endereco.uf}`,
      },
      { emitEvent: false }
    );
  }

  public enviarDados() {
    alert('Dados do formulário enviado com sucesso!');
    console.log(this.form.value);
  }

  public limparDados() {
    this.form.reset()
  }
}
