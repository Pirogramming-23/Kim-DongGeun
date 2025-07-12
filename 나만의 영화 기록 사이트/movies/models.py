from django.db import models
from django.utils import timezone

class Movie(models.Model):
    GENRE_CHOICES = [
        ('SF', 'SF'),
        ('Action', 'Action'),
        ('Comedy', 'Comedy'),
        ('Drama', 'Drama'),
        ('Romance', 'Romance'),
        ('Thriller', 'Thriller'),
        ('Animation', 'Animation'),
        # 원하는 장르 추가
    ]
    title = models.CharField("제목", max_length=100)
    year = models.PositiveIntegerField("개봉년도", default=2000)  # 기본값 설정
    genre = models.CharField("장르", max_length=30, choices=GENRE_CHOICES)
    rating = models.FloatField("별점", default=0.0)
    running_time = models.PositiveIntegerField("러닝타임", default=0)  # 분 단위
    review = models.TextField("리뷰", default="입력해주세요!")
    director = models.CharField("감독", max_length=100)
    actors = models.CharField("배우", max_length=100, default="입력해주세요!")
    poster_url = models.URLField("포스터 URL", blank=True, null=True)
    created_at = models.DateTimeField("작성일", default=timezone.now)

    def __str__(self):
        return self.title
