---
sidebar_position: 1
---

# Principes SOLID

SOLID est un acronyme qui représente cinq principes de design de code en programmation orientée objet (POO). Ces principes visent à améliorer la qualité du code en le rendant plus maintenable, extensible et facile à comprendre.
En résumé, SOLID est un ensemble de principes qui peuvent vous aider à écrire du code de qualité en le rendant plus lisible, maintenable et extensible. Utiliser ces principes peut vous aider à créer des applications qui sont plus faciles à mettre à jour et à maintenir sur le long terme.

## Single responsibility principle

Chaque classe doit avoir une seule responsabilité et tous ses services doivent être alignés sur cette responsabilité.

Prenons l'exemple d'un module qui compile et imprime un rapport. Imaginons que ce module peut changer pour deux raisons. D'abord, le contenu du rapport peut changer. Ensuite, le format du rapport peut changer. Ces deux choses changent pour des causes différentes ; l'une substantielle, et l'autre cosmétique. Le principe de responsabilité unique dit que ces deux aspects du problème ont deux responsabilités distinctes, et devraient donc être dans des classes ou des modules séparés. Ce serait une mauvaise conception de coupler ces deux choses dans une même classe.

La raison pour laquelle il est important de garder une classe axée sur une seule préoccupation est que cela rend la classe plus robuste. En continuant avec l'exemple précédent, s'il y a un changement dans le processus de compilation du rapport, il y a un plus grand danger que le code d'impression se casse si elle fait partie de la même classe.

:::danger Don't
```cs
public string DownloadRapport() 
{
  var user = repository.GetCurrentUser();
  var account = repository.GetAccount(user);
  var rapportData = new RapportData 
  {
    Currency = currency, 
    User = user, 
    Date = DateTimeNow    
  };

  return @$"<html>
    <body>
      Utilisateur : {user.Name}
      Montant : {account.Value}
      Date : {date.ToString()}
    </body>
  </html>"
}
```
:::

:::tip Do
```cs
public string DownloadRapport() 
{
  return ToString(GetRapport());
}

public RapportData GetRapport() 
{
  var user = repository.GetCurrentUser();
  var account = repository.GetAccount(user);
  return new RapportData 
  {
    Currency = currency, 
    User = user, 
    Date = DateTimeNow    
  };
}

public string ToString(RapportData rapport) 
{
  return @$"<html>
    <body>
      Utilisateur : {rapport.User.Name}
      Montant : {rapport.Account.Value}
      Date : {rapport.Date.ToString()}
    </body>
  </html>"
}
```
:::

## Open/closed principle

Une classe doit être ouverte pour l'extension, mais fermée pour la modification. Cela signifie que vous devriez être en mesure d'étendre les fonctionnalités d'une classe sans la modifier.
L'idée est qu'une fois qu'une classe a été approuvée via des revues de code, des tests unitaires et d'autres procédures de qualification, elle ne doit plus être modifiée mais seulement étendue.
Dans le quotidien du développeur, cela se traduit par le fait que tout ajout/modificaion d'une fonctionnalité ne devrait se faire que par ajout de code (**donc aucune suppression du code déjà existant**).

Prenons l'exemple d'un module qui enverrait un email de rappel aux parents des étudiants mineurs d'une école qui n'aurait pas validé un examen.

```cs
public void WarnParent() 
{
  var studentsFailed = allStudents
    .where(s => s.Age < 18)
    .Where(s => s.Note < 10);

  foreach (var student in studentsFailed)
  {
    smtp.Send("Rappel !! Veuillez valider tous vos examens.", student.Parent.Email);
  }
}
```

Ici la méthode n'est pas ouvert à l'extension. Toutes modifications de la fonctionnalité 
(changement de la moyenne, modification de l'age, contenu du message à envoyé, ...)
nécessite une modification de la méthode. 

Si l'on souhaite ouvrir cette méthode à l'extension pour changement la moyenne, l'age et le contenu du message, on peut s'y prendre ainsi.

```cs
public void WarnParent(double average = 10, int age=18, string message = "Rappel !! Veuillez valider tous vos examens.") 
{
  var studentsFailed = allStudents
    .where(s => s.Age < age)
    .Where(s => s.Note < average);

  foreach (var student in studentsFailed)
  {
    smtp.Send(message, student.Parent.Email);
  }
}
```

:::warning A noter
Dans cette exemple la méthode d'envoi de l'email et la liste des étudiants restent fermées à la modificaion.
:::

## Liskov substitution principle

Une classe fille doit être substituable à sa classe mère. Cela signifie que si une classe a été conçue pour travailler avec une classe mère, elle doit également pouvoir travailler avec une classe fille sans causer d'erreurs.
Pour faire simple, on évite d'avoir un code comme celui-ci :

```cs
public void MyFunction<T>(T obj) 
{
  if (t is ClasseA) 
  {
    // Do something
  } 
  else if (t is ClasseB) 
  {
    // Do something else
  }
}
```

## Interface segregation principle

Les clients ne doivent pas être obligés de dépendre des interfaces qu'ils n'utilisent pas. Cela signifie qu'une interface doit être découpée en plusieurs interfaces plus petites et spécialisées plutôt qu'une seule interface générale.
Aucun client ne devrait dépendre de méthodes qu'il n'utilise pas. Il faut donc diviser les interfaces volumineuses en plus petites plus spécifiques, de sorte que les clients n'ont accès qu'aux méthodes intéressantes pour eux. 
Ces interfaces rétrécies sont également appelées interfaces de rôle. Tout ceci est destiné à maintenir un système à couplage faible, donc plus facile à refactoriser.

```cs title=src/IUserService.cs
public interface IUserService 
{
  void Login(string email, string pasword);
  void Logout();
  User GetCurrentUser();
}
```
```cs title=src/UserService.cs
public class UserService : IUserService
{
  // Implémentation de l'interface
  // ...
}
```


```cs title=src/Program.cs
app.MapGet('/user', (IUserService userService) => {
  var user = userService.GetCurrentUser();
  return user.Login;
});
```

Dans l'exemple ci dessus, l'endpoint `/user` dépend de l'interface IUserService car il utilise la méthode GetCurrentUser de celui-ci.
En dépendant de cette interface il dépend également des méthodes Login et Logout qu'il n'utilise pas.
Du coup l'interface IUserService a un interet à être divisé pour que l'endpoint `/user` ne dépende que de ce qu'il a besoin.

```cs title=src/IUserService.cs
public interface IUserService : ILoginService, ICurrentUserService
{
}

public interface ILoginService 
{
  void Login(string email, string pasword);
  void Logout();
}

public interface ICurrentUserService 
{
  User GetCurrentUser();
}
```
```cs title=src/UserService.cs
public class UserService : IUserService
{
  // Implémentation de l'interface
  // ...
}
```

```cs title=src/Program.cs
app.MapGet('/user', (ICurrentUserService userService) => {
  var user = userService.GetCurrentUser();
  return user.Login;
});
```

## Dependency inversion principle

:::danger Attention !
Le principe d'**inversion** de dépendances est souvent confondu avec le mécanisme d'**injection** de dépendances.
Ce sont deux choses très différentes qui n'ont aucun rapport l'un avec l'autre.
:::

Les hauts niveaux de modules ne doivent pas dépendre des bas niveaux de modules. Les deux doivent dépendre d'abstractions. Cela signifie que vous devriez dépendre des interfaces plutôt que des implementations concrètes, ce qui rend votre code plus flexible et modulaire.

Prenons l'exemple suivant pour illustrer ce principe.

```cs title=src/ClasseA.cs
public class Car 
{
  private readonly FuelEngine engine;

  public Car() 
  {
    engine = new FuelEngine();
  }

  public void Drive() 
  {
    engine.Start();
  }
}
```

```cs title=src/ClasseB.cs
public class FuelEngine
{
  public void Start() 
  {
  }
}
```
```cs title=src/Program.cs
new Car().Drive();
```

Dans cet exmple La class **Car** dépend fortement de la classe **FuelEngine**. 

```
Car -> FuelEngine
```

Si l'on souhaite utiliser la classe **Car** avec un autre type de moteur (**ElectricEngine** par exemple), il nous est impossible de le faire.
Pour ce faire il faut que la dépendence engine soit du type d'une abstraction de ce qu'est un moteur. Cela donne.

```cs title=src/IEngine.cs
public interface IEngine 
{
  void Start();
}
```

```cs title=src/Car.cs
public class Car 
{
  private readonly IEngine engine;

  public Car(IEngine engine) 
  {
    this.engine = engine;
  }

  public void Drive() 
  {
    engine.Start();
  }
}
```

```cs title=src/FuelEngine.cs
public class FuelEngine : IEngine
{
  public void Start() 
  {
  }
}
```

```cs title=src/ElectricEngine.cs
public class ElectricEngine : IEngine
{
  public void Start() 
  {
  }
}
```
```cs title=src/Program.cs
// with fuel
new Car(new FuelEngine()).Drive();

// with electric
new Car(new ElectricEngine()).Drive();
```

:::info
Bien qu'au runtime les dépendances en mémoire sont toujours du sens :
```
Car -> FuelEngine
Car -> ElectricEngine
```

Au build, les dépendances se retrouvent inversées : 
```
(Car -> IEngine) <- FuelEngine
(Car -> IEngine) <- ElectricEngine
```
:::