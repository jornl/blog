Java is great for object-oriented programming. One thing to note is that you can easily create and use objects from
classes. For example:

```java
class Car {
  int modelYear;
  String modelName;

  public Car(int year, String name) {
    modelYear = year;
    modelName = name;
  }

  public static void main(String[] args) {
    Car myCar = new Car(1969, "Mustang");
    System.out.println(myCar.modelYear + " " + myCar.modelName);
  }
}
```

This code will output:

```
1969 Mustang
```
