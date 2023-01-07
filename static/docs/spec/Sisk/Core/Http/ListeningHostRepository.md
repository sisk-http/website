# Class ListeningHostRepository

## Definition
Namespace: Sisk.Core.Http

```csharp
public class ListeningHostRepository : ICollection<ListeningHost>, IEnumerable<ListeningHost>
```

Represents an fluent repository of [ListeningHost](/spec/Sisk/Core/Http/ListeningHost) that can add, modify, or remove listening hosts while an [HttpServer](/spec/Sisk/Core/Http/HttpServer) is running.

## Properties

| Property name | Description |
| --- | --- |
| [Count](/spec/Sisk/Core/Http/ListeningHostRepository/Count) | Gets the number of elements contained in this [ListeningHostRepository](/spec/Sisk/Core/Http/ListeningHostRepository) . | 
| [IsReadOnly](/spec/Sisk/Core/Http/ListeningHostRepository/IsReadOnly) | Gets an boolean indicating if this [ListeningHostRepository](/spec/Sisk/Core/Http/ListeningHostRepository) is read only. This property always returns `true` . | 

## Methods

| Method name | Description |
| --- | --- |
| [Add(ListeningHost)](/spec/Sisk/Core/Http/ListeningHostRepository/Add--ListeningHost) | Adds a listeninghost to this repository. If this listeninghost already exists in this class, an exception will be thrown. | 
| [Clear()](/spec/Sisk/Core/Http/ListeningHostRepository/Clear--) | Removes all listeninghosts from this repository. | 
| [Contains(ListeningHost)](/spec/Sisk/Core/Http/ListeningHostRepository/Contains--ListeningHost) | Determines if an [ListeningHost](/spec/Sisk/Core/Http/ListeningHost) is present in this repository. | 
| [CopyTo(ListeningHost[], Int32)](/spec/Sisk/Core/Http/ListeningHostRepository/CopyTo--ListeningHost[]-Int32) | Copies all elements from this repository to another compatible repository. | 
| [GetEnumerator()](/spec/Sisk/Core/Http/ListeningHostRepository/GetEnumerator--) | Returns an enumerator that iterates through this [ListeningHostRepository](/spec/Sisk/Core/Http/ListeningHostRepository) . | 
| [Remove(ListeningHost)](/spec/Sisk/Core/Http/ListeningHostRepository/Remove--ListeningHost) | Try to remove a [ListeningHost](/spec/Sisk/Core/Http/ListeningHost) from this repository. If the item is removed, this methods returns `true` . | 
| [System#Collections#IEnumerable#GetEnumerator()](/spec/Sisk/Core/Http/ListeningHostRepository/System_Collections_IEnumerable_GetEnumerator--) | Returns an enumerator that iterates through this [ListeningHostRepository](/spec/Sisk/Core/Http/ListeningHostRepository) . | 

## Constructors

| Method name | Description |
| --- | --- |
| [ListeningHostRepository()](/spec/Sisk/Core/Http/ListeningHostRepository/_ctor--) | Creates a new instance of an empty [ListeningHostRepository](/spec/Sisk/Core/Http/ListeningHostRepository) . | 
| [ListeningHostRepository()](/spec/Sisk/Core/Http/ListeningHostRepository/_ctor--) | Creates a new instance of an [ListeningHostRepository](/spec/Sisk/Core/Http/ListeningHostRepository) copying the items from another collection of [ListeningHost](/spec/Sisk/Core/Http/ListeningHost) . | 

