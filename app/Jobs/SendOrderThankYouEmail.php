<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use App\Models\User;

class SendOrderThankYouEmail implements ShouldQueue
{
  use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

  public $user;

  public function __construct(User $user)
  {
    $this->user = $user;
  }

  public function handle()
  {
    Mail::to($this->user->email)->send(new \App\Mail\OrderThankYouMail($this->user));
  }
}
