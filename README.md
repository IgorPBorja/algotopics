# Descrição: agrupando informação de forma acessível
## Estrutura de links e da disposição de artigos

## Estrutura dos comentários
Dentro da pasta ```comments```, cada arquivo ```.json``` armazena a lista dos comentários realizados em uma determinada página, na seguinte estrutura:
```json
{
    {
      "id": "00000001",
      "timestamp": "<year/month/day hours:minutes:seconds>",
      "content": "<this is the text of the comment>",
      "email": "name@mail.com"
    },
    ...
}
```

Ademais, teremos um arquivo de ligação ```links.json```, que liga cada arquivo ```.json``` com o HTML da página correspondente:
```json
{
  "<file_name1.json>": "page_link1.html",
  ...
}
```

O nome de cada arquivo JSON é da forma ```cXXXXXXXX.json``` onde ```XXXXXXXX``` é uma string numérica de 8 dígitos.
Dessa forma, temos o seguinte algoritmo para fazer a disposição dos $k$ últimos comentários:

```
for file.json in links.json:
  if link == target_link:
    for i in range(k):
      display the k-th last comment on file.json
```
em $O(p + k)$, sendo $p$ o total de páginas, o que é bem rápido.

