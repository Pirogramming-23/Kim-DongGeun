# movies/views.py

from django.shortcuts import render, get_object_or_404, redirect
from .models import Movie
from .forms import MovieForm

def get_time_str(minutes):
    hours = minutes // 60
    mins = minutes % 60
    if hours > 0:
        return f"{hours}시간 {mins}분"
    else:
        return f"{mins}분"


def movie_list(request):
    sort = request.GET.get('sort', 'created_at')  # 기본값: 최신순
    if sort == 'title':
        movies = Movie.objects.all().order_by('title')
    elif sort == 'rating':
        movies = Movie.objects.all().order_by('-rating')
    elif sort == 'running_time':
        movies = Movie.objects.all().order_by('-running_time')
    else:
        movies = Movie.objects.all().order_by('-created_at')
    # 러닝타임 변환 추가
    for movie in movies:
        movie.running_time_str = get_time_str(movie.running_time)
    return render(request, 'movies/movie_list.html', {'movies': movies, 'sort': sort})


def movie_detail(request, pk):
    movie = get_object_or_404(Movie, pk=pk)
    movie.running_time_str = get_time_str(movie.running_time)
    return render(request, 'movies/movie_detail.html', {'movie': movie})

def movie_create(request):
    if request.method == 'POST':
        form = MovieForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('movies:list')
    else:
        form = MovieForm()
    return render(request, 'movies/movie_form.html', {'form': form})

def movie_update(request, pk):
    movie = get_object_or_404(Movie, pk=pk)
    if request.method == 'POST':
        form = MovieForm(request.POST, instance=movie)
        if form.is_valid():
            form.save()
            return redirect('movies:detail', pk=pk)
    else:
        form = MovieForm(instance=movie)
    return render(request, 'movies/movie_form.html', {'form': form})

def movie_delete(request, pk):
    movie = get_object_or_404(Movie, pk=pk)
    movie.delete()
    return redirect('movies:list')
