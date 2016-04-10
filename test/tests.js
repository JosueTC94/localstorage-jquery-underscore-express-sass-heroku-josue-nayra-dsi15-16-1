var expect = chai.expect;

//Solo se testea la función calculate. 
//Uso de sinon

describe('Comma separated values',function()
{
    describe('#Funcion calculate. Mocha, Chai y Sinon',function()
    {
        var sandbox;
        beforeEach(function()
        {
            sandbox = sinon.sandbox.create();
            sandbox.stub(window.console,"log");
            sandbox.stub(window.console, "error");
        });
        
        afterEach(function()
        {
            sandbox.restore();
        });
        
        it("Se genera una tabla de 4 filas correctamente. rowClass no devuelve ningún error",function()
        {
            expect(calculate("\"Animal\",\"Patas\"\n\"Perro\",\"4\"\n\"Gallina\",\"2\"\n\"Araña\",\"8\"").length).to.be.equal(4); 
            $.each(calculate("\"Animal\",\"Patas\"\n\"Perro\",\"4\"\n\"Gallina\",\"2\"\n\"Araña\",\"8\""),function(campo,valor)
            {
                //console.log("Campo:"+campo+", Valor:" +valor);
                $.each(valor,function(campo1,valor1)
                {
                    if(campo1 == "rowClass")
                    {
                        expect(valor1).to.not.be.equal("error");
                    }
                });
            });
            sinon.assert.calledTwice(console.log);
            sinon.assert.notCalled(console.error);
        });
        
        it("El formato para generar la tabla no es correcto. Calculate devuelve un error en la fila 3.",function()
        {
            var aux = calculate("\"producto\",\"precio\"\n\"caca\",\"vaca\"\n\"producto\",\"precio\"\n\"caca\"");
            expect(aux[0].rowClass).to.not.be.equal("error");
            expect(aux[1].rowClass).to.not.be.equal("error");
            expect(aux[2].rowClass).to.not.be.equal("error");
            expect(aux[3].rowClass).to.be.equal("error");
            sinon.assert.calledOnce(console.log);
            sinon.assert.notCalled(console.error);
            sinon.assert.calledWithExactly(console.log,"Generando tabla");
            
        });
      
      it ('Comprobando que cada fila de la tabla generada tiene los valores correctos...',function(){
        this.original = "\"Animal\",\"Patas\"\n\"Perro\",\"4\"\n\"Gallina\",\"2\"";
        var auxiliar = calculate(this.original);
        expect(auxiliar[0].value).to.deep.equal(['Animal','Patas']);
        expect(auxiliar[1].value).to.deep.equal(['Perro', '4']);
        expect(auxiliar[2].value).to.deep.equal(['Gallina', '2']);
        sinon.assert.calledOnce(console.log);
        sinon.assert.notCalled(console.error);
        sinon.assert.calledWithExactly(console.log,"Generando tabla");
      });
      
      it('Pasandole null a la función calculate. Debe devolver un error',function()
      {
        calculate(null);
        sinon.assert.calledOnce(console.error);
        sinon.assert.calledWithExactly(console.error,"No se le ha pasado ningún parámetro a la función calculate...");
      });

    });
});